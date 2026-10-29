const attendance = {
"Moquegua":93.7,"Apurímac":92.1,"Arequipa":91.6,"Callao":89.7,"Cusco":89.6,"Amazonas":89.5,"Región Lima":89.4,"Puno":88.8,"Ica":88.1,"Junín":87.9,"Tacna":87.2,"Pasco":87.2,"Lima Metropolitana":87.1,"Madre de Dios":86.8,"Ayacucho":86.7,"Tumbes":86.6,"Lambayeque":86.2,"Áncash":86.0,"Huancavelica":85.9,"Piura":85.5,"Cajamarca":85.4,"Huánuco":83.8,"San Martín":83.3,"Ucayali":82.9,"Loreto":81.8,"La Libertad":80.8};
const literacy = {"Huánuco":12.1,"Cajamarca":10.6,"Apurímac":10.2,"Huancavelica":10.0,"Cusco":9.1,"Ayacucho":8.9,"Áncash":7.3,"Puno":7.0,"Amazonas":6.4,"Piura":5.7,"San Martín":5.4,"Junín":4.9,"La Libertad":4.9,"Pasco":4.5,"Loreto":4.3,"Lambayeque":4.1,"Tacna":4.1,"Ucayali":3.8,"Tumbes":3.8,"Región Lima":3.7,"Arequipa":3.2,"Moquegua":3.0,"Ica":2.4,"Madre de Dios":2.2,"Callao":1.9,"Lima Metropolitana":1.8};
const years=[2014,2015,2016,2017,2018,2019,2020,2021,2022,2023,2024];
const literacyRates=[6.3,6.0,5.9,5.9,5.6,5.6,5.5,5.2,5.1,4.8,4.7];
const areaData={Nacional:[84.5,80.8,83.5,84.3,85.3,86.6],Urbana:[86.7,82.2,84.9,85.6,86.2,87.2],Rural:[79.3,76.9,79.6,80.4,82.4,85.0]};
const areaYears=[2019,2020,2021,2022,2023,2024];
const layoutBase={paper_bgcolor:"white",plot_bgcolor:"white",font:{family:"Inter, Arial, sans-serif",color:"#333",size:11},margin:{l:145,r:30,t:18,b:55},xaxis:{gridcolor:"#ececec",zerolinecolor:"#d8d8d8",ticksuffix:"%"},yaxis:{gridcolor:"rgba(0,0,0,0)",automargin:true},showlegend:false};
const config={responsive:true,displaylogo:false,modeBarButtonsToRemove:["lasso2d","select2d"]};
function sortedEntries(obj){return Object.entries(obj).sort((a,b)=>a[1]-b[1]);}
function barTrace(entries,color="#777"){return {type:"bar",orientation:"h",y:entries.map(d=>d[0]),x:entries.map(d=>d[1]),marker:{color:entries.map(d=>d[1]>=86.6&&color==="attendance"?"#222":color==="attendance"?"#bdbdbd":color)},hovertemplate:"%{y}: %{x:.1f}%<extra></extra>"};}
function attendancePlot(id,type="bar",mini=false){
 const e=sortedEntries(attendance), tr=type==="dot"?{type:"scatter",mode:"markers",y:e.map(d=>d[0]),x:e.map(d=>d[1]),marker:{size:8,color:"#555"},hovertemplate:"%{y}: %{x:.1f}%<extra></extra>"}:barTrace(e,"attendance");
 const l=JSON.parse(JSON.stringify(layoutBase));l.margin={l:mini?100:155,r:25,t:15,b:45};l.height=mini?330:Math.max(520,e.length*23);
 l.xaxis={title:"Asistencia neta (%)",gridcolor:"#ececec",range:[75,96],ticksuffix:"%"};
 if(!mini){l.shapes=[{type:"line",x0:86.6,x1:86.6,y0:0,y1:1,yref:"paper",line:{color:"#111",dash:"dash",width:1.5}}];l.annotations=[{x:86.6,y:1,yref:"paper",text:"Nacional 86,6%",showarrow:false,yshift:12,font:{size:10,color:"#333"}}];}
 Plotly.newPlot(id,[tr],l,config);
}
function literacyPlot(id,type="bar",mini=false){
 const e=sortedEntries(literacy),tr=type==="dot"?{type:"scatter",mode:"markers",y:e.map(d=>d[0]),x:e.map(d=>d[1]),marker:{size:8,color:"#555"},hovertemplate:"%{y}: %{x:.1f}%<extra></extra>"}:{type:"bar",orientation:"h",y:e.map(d=>d[0]),x:e.map(d=>d[1]),marker:{color:"#777"},hovertemplate:"%{y}: %{x:.1f}%<extra></extra>"};
 const l=JSON.parse(JSON.stringify(layoutBase));l.margin={l:mini?100:155,r:25,t:15,b:45};l.height=mini?330:Math.max(520,e.length*23);l.xaxis={title:"Tasa de analfabetismo (%)",gridcolor:"#ececec",range:[0,13.5],ticksuffix:"%"};
 if(!mini){l.shapes=[{type:"line",x0:4.7,x1:4.7,y0:0,y1:1,yref:"paper",line:{color:"#111",dash:"dash",width:1.5}}];l.annotations=[{x:4.7,y:1,yref:"paper",text:"Nacional 4,7%",showarrow:false,yshift:12,font:{size:10,color:"#333"}}];}
 Plotly.newPlot(id,[tr],l,config);
}
function evolutionPlot(type="line"){
 let tr=type==="bar"?{type:"bar",x:years,y:literacyRates,marker:{color:"#777"},hovertemplate:"%{x}: %{y:.1f}%<extra></extra>"}:{type:"scatter",mode:"lines+markers+text",x:years,y:literacyRates,text:literacyRates.map(v=>v.toFixed(1)+"%"),textposition:"top center",line:{color:"#222",width:3},marker:{color:"#222",size:7},fill:"tozeroy",fillcolor:"rgba(0,0,0,.05)",hovertemplate:"%{x}: %{y:.1f}%<extra></extra>"};
 Plotly.newPlot("evolution-chart",[tr],{...layoutBase,margin:{l:60,r:25,t:35,b:50},height:430,showlegend:false,xaxis:{title:"Año",dtick:1,gridcolor:"#f0f0f0"},yaxis:{title:"Analfabetismo (%)",range:[0,7],ticksuffix:"%",gridcolor:"#ececec"}},config);
}
function areaPlot(type="line"){
 const colors={Nacional:"#222",Urbana:"#777",Rural:"#aaa"};
 const traces=Object.entries(areaData).map(([name,vals])=>type==="bar"?{type:"bar",name,x:areaYears,y:vals,marker:{color:colors[name]},hovertemplate:name+" · %{x}: %{y:.1f}%<extra></extra>"}:{type:"scatter",mode:"lines+markers",name,x:areaYears,y:vals,line:{color:colors[name],width:2.5},marker:{size:7},hovertemplate:name+" · %{x}: %{y:.1f}%<extra></extra>"});
 Plotly.newPlot("area-chart",traces,{...layoutBase,barmode:"group",margin:{l:65,r:25,t:20,b:50},height:430,showlegend:true,legend:{orientation:"h",y:-.2},xaxis:{title:"Año",dtick:1,gridcolor:"#f0f0f0"},yaxis:{title:"Asistencia neta (%)",range:[70,90],ticksuffix:"%",gridcolor:"#ececec"}},config);
}
const meta={
resumen:["Resumen general","Una lectura visual de las diferencias territoriales y de la evolución de indicadores educativos del Perú."],
asistencia:["Asistencia secundaria","Comparación departamental de la tasa neta de asistencia a educación secundaria en 2024."],
analfabetismo:["Analfabetismo","Distribución departamental de la tasa de analfabetismo para la población de 15 años o más en 2024."],
evolucion:["Evolución 2014–2024","Tendencia anual de la tasa de analfabetismo nacional a lo largo del periodo."],
residencia:["Área de residencia","Comparación de la asistencia neta a secundaria para los ámbitos nacional, urbano y rural."],
datos:["Base de datos","Consulta y exportación de los valores incluidos en las cuatro visualizaciones."],
fuentes:["Fuentes y metodología","Referencia de publicación y nota sobre el tratamiento de los datos."]
};
document.querySelectorAll("nav button").forEach(btn=>btn.addEventListener("click",()=>{
 document.querySelectorAll("nav button").forEach(b=>b.classList.toggle("active",b===btn));
 document.querySelectorAll(".view").forEach(v=>v.classList.toggle("active",v.id===btn.dataset.view));
 document.getElementById("page-title").textContent=meta[btn.dataset.view][0];document.getElementById("page-lead").textContent=meta[btn.dataset.view][1];
 setTimeout(()=>window.dispatchEvent(new Event("resize")),60);
}));
document.querySelectorAll("[data-att-type]").forEach(b=>b.addEventListener("click",()=>{document.querySelectorAll("[data-att-type]").forEach(x=>x.classList.toggle("active",x===b));attendancePlot("attendance-chart",b.dataset.attType);}));
document.querySelectorAll("[data-lit-type]").forEach(b=>b.addEventListener("click",()=>{document.querySelectorAll("[data-lit-type]").forEach(x=>x.classList.toggle("active",x===b));literacyPlot("literacy-chart",b.dataset.litType);}));
document.querySelectorAll("[data-evo-type]").forEach(b=>b.addEventListener("click",()=>{document.querySelectorAll("[data-evo-type]").forEach(x=>x.classList.toggle("active",x===b));evolutionPlot(b.dataset.evoType);}));
document.querySelectorAll("[data-area-type]").forEach(b=>b.addEventListener("click",()=>{document.querySelectorAll("[data-area-type]").forEach(x=>x.classList.toggle("active",x===b));areaPlot(b.dataset.areaType);}));
const sets={
attendance:{headers:["Departamento","Porcentaje (%)"],rows:sortedEntries(attendance).map(([k,v])=>[k,v.toFixed(1)])},
literacy:{headers:["Departamento","Porcentaje (%)"],rows:sortedEntries(literacy).map(([k,v])=>[k,v.toFixed(1)])},
evolution:{headers:["Año","Analfabetismo (%)"],rows:years.map((y,i)=>[y,literacyRates[i].toFixed(1)])},
area:{headers:["Año","Área","Porcentaje (%)"],rows:Object.entries(areaData).flatMap(([area,vals])=>vals.map((v,i)=>[areaYears[i],area,v.toFixed(1)]))}
};
function renderTable(){
 const key=document.getElementById("dataset").value,s=sets[key];
 document.getElementById("table-head").innerHTML="<tr>"+s.headers.map(h=>"<th>"+h+"</th>").join("")+"</tr>";
 document.getElementById("table-body").innerHTML=s.rows.map(r=>"<tr>"+r.map((v,i)=>"<td"+(i>0?' class="num"':"")+">"+v+"</td>").join("")+"</tr>").join("");
}
document.getElementById("dataset").addEventListener("change",renderTable);
document.getElementById("download-csv").addEventListener("click",()=>{
 const s=sets[document.getElementById("dataset").value];const csv=[s.headers,...s.rows].map(row=>row.map(v=>'"'+String(v).replace(/"/g,'""')+'"').join(";")).join("\r\n");
 const blob=new Blob(["\ufeff"+csv],{type:"text/csv;charset=utf-8;"}),url=URL.createObjectURL(blob),a=document.createElement("a");a.href=url;a.download=document.getElementById("dataset").value+"_inei.csv";a.click();URL.revokeObjectURL(url);
});
attendancePlot("overview-attendance","bar",true);
literacyPlot("overview-literacy","bar",true);
attendancePlot("attendance-chart");
literacyPlot("literacy-chart");
evolutionPlot();
areaPlot();
renderTable();