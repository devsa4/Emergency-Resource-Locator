import { HOSPITALS, SHELTERS, FIRE, POLICE } from "../../frontend/config/appData";

function replaceItems(target,next){
  target.splice(0,target.length,...next);
}
function getAllResources(){
  return [...HOSPITALS,...SHELTERS,...FIRE,...POLICE];
}
function safeText(v,fallback=""){
  return typeof v==="string"&&v.trim()?v.trim():fallback;
}
function parseList(v,fallback){
  const out=safeText(v).split(";").map(x=>x.trim()).filter(Boolean);
  return out.length?out:fallback;
}
function pickPhone(tags){
  return safeText(
    tags.phone||
    tags["contact:phone"]||
    tags["operator:phone"]||
    tags["emergency:phone"],
    "Not listed"
  );
}
function buildAddress(tags){
  const parts=[tags["addr:housename"],tags["addr:housenumber"],tags["addr:street"],tags["addr:suburb"],tags["addr:city"],tags["addr:state"]];
  const text=parts.filter(Boolean).join(", ");
  return text||safeText(tags.address,"Address unavailable");
}
function projectCoords(lat,lng){
  const x=Math.max(40,Math.min(760,Math.round(((lng-77.8)/0.7)*700+40)));
  const y=Math.max(40,Math.min(420,Math.round((1-((lat-30.0)/0.45))*380+40)));
  return {x,y};
}
function mapHospitalResource(el,index){
  const tags=el.tags||{};
  const lat=el.lat??el.center?.lat;
  const lng=el.lon??el.center?.lon;
  const bedsTag=Number(tags.beds||tags["capacity:beds"]);
  return {
    id:"osm-h-"+(el.type||"node")+"-"+el.id,
    name:safeText(tags.name,"Hospital"),
    type:"hospital",
    lat,
    lng,
    address:buildAddress(tags),
    phone:pickPhone(tags),
    beds:Number.isFinite(bedsTag)&&bedsTag>0?bedsTag:100,
    availableBeds:null,
    specialties:parseList(tags["healthcare:speciality"]||tags.speciality||tags.department,["General Emergency"]),
    icon:"H",
    "24h":tags.opening_hours==="24/7"||tags.emergency==="yes",
    govt:/(government|public|state|district|municipal)/i.test((tags.operator_type||"")+" "+(tags.ownership||"")),
    rating:null,
    estTime:null,
    coords:projectCoords(lat,lng),
    source:"live",
    sourceUpdatedAt:Date.now(),
    rank:index+1,
  };
}
function mapShelterResource(el,index){
  const tags=el.tags||{};
  const lat=el.lat??el.center?.lat;
  const lng=el.lon??el.center?.lon;
  const capacity=Number(tags.capacity);
  const isNgo=tags.office==="ngo";
  const isAssembly=tags.emergency==="assembly_point";
  return {
    id:"osm-s-"+(el.type||"node")+"-"+el.id,
    name:safeText(tags.name,isNgo?"NGO Support Center":(isAssembly?"Emergency Assembly Point":"Shelter")),
    type:"shelter",
    lat,
    lng,
    address:buildAddress(tags),
    capacity:Number.isFinite(capacity)&&capacity>0?capacity:100,
    current:0,
    available:Number.isFinite(capacity)&&capacity>0?capacity:null,
    amenities:parseList(tags.amenity||tags.shelter_type||tags["social_facility:for"]||tags["ngo"]||tags.operator,["Shelter support"]),
    icon:"S",
    coords:projectCoords(lat,lng),
    contact:pickPhone(tags),
    supportType:isNgo?"ngo":(isAssembly?"assembly":"shelter"),
    source:"live",
    sourceUpdatedAt:Date.now(),
    rank:index+1,
  };
}
function normalizeLiveResources(payload){
  const elements=Array.isArray(payload?.elements)?payload.elements:[];
  const hospitals=elements
    .filter(el=>{
      const tags=el.tags||{};
      return tags.amenity==="hospital"||tags.amenity==="clinic";
    })
    .filter(el=>(el.lat??el.center?.lat)!==undefined&&(el.lon??el.center?.lon)!==undefined)
    .map(mapHospitalResource)
    .slice(0,20);
  const shelters=elements
    .filter(el=>{
      const tags=el.tags||{};
      return tags.amenity==="shelter"||tags.social_facility==="shelter"||tags.emergency==="assembly_point"||tags.office==="ngo";
    })
    .filter(el=>(el.lat??el.center?.lat)!==undefined&&(el.lon??el.center?.lon)!==undefined)
    .map(mapShelterResource)
    .slice(0,20);
  return {hospitals,shelters,fetchedAt:Date.now()};
}

export { replaceItems, getAllResources, safeText, parseList, pickPhone, buildAddress, projectCoords, mapHospitalResource, mapShelterResource, normalizeLiveResources };
