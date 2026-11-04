(function(){
  'use strict';
  var root=document.getElementById('epcAutoDesign');
  if(!root)return;
  var ids=['epcCustomer','epcSegment','epcLat','epcLon','epcKw','epcWp','epcModW','epcModL','epcOrientation','epcTilt','epcAzimuth','epcSunAlt','epcLength','epcWidth','epcSetback','epcWalkway','epcObstacles','epcSupportSpan','epcInvKw','epcMaxDc','epcVoc','epcVocCoeff','epcMinTemp','epcDcRoute','epcAcRoute','epcCableAllowance'];
  var mode='rooftop',last=null;
  var $=function(id){return document.getElementById(id)};
  var val=function(id){var n=parseFloat($(id).value);return isFinite(n)?n:0};
  var fmt=function(n,d){return Number(n||0).toLocaleString('en-IN',{maximumFractionDigits:d==null?2:d})};
  var safe=function(s){return String(s==null?'':s).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]})};
  var toast=function(s){var el=document.getElementById('toast');if(el){el.textContent=s;el.hidden=false;clearTimeout(el._epcTimer);el._epcTimer=setTimeout(function(){el.hidden=true},2600)}else if(typeof window.toast==='function')window.toast(s)};
  var css='.epc-workspace{display:flex;flex-direction:column;gap:14px;margin:14px 0}.epc-head{display:flex;justify-content:space-between;gap:12px;align-items:flex-start;flex-wrap:wrap;background:linear-gradient(120deg,#0a6b4f,#064532);color:#fff;border-radius:16px;padding:18px}.epc-head h2{font:800 23px/1.15 var(--font-display);margin:4px 0;color:#fff}.epc-head p{margin:0;color:#d5eee4;font-size:13px}.epc-kicker{font:700 10px var(--font-mono);letter-spacing:.12em;color:#ffd45c}.epc-status{font:700 10px var(--font-mono);border:1px solid #a5d9c4;border-radius:99px;padding:6px 9px;color:#e6fff4}.epc-tabs{display:flex;gap:8px;background:var(--surface-2);padding:5px;border-radius:12px}.epc-mode{flex:1;border:0;background:transparent;color:var(--muted);padding:10px;border-radius:9px;font:700 13px var(--font-body)}.epc-mode.active{background:var(--solar);color:var(--on-solar)}.epc-grid{display:grid;grid-template-columns:1fr;gap:12px}@media(min-width:900px){.epc-grid{grid-template-columns:repeat(2,minmax(0,1fr))}}.epc-panel{background:var(--surface);border:1px solid var(--line);border-radius:14px;padding:15px;display:flex;flex-direction:column;gap:12px;min-width:0}.epc-panel h3{margin:0;font:700 15px var(--font-body);color:var(--ink)}.epc-fields{display:grid;grid-template-columns:repeat(auto-fit,minmax(135px,1fr));gap:10px}.epc-fields label{display:flex;flex-direction:column;gap:5px;font-size:12px;font-weight:600;color:var(--muted)}.epc-fields input,.epc-fields select{width:100%;min-width:0;padding:9px 10px;border:1px solid var(--line);border-radius:8px;background:var(--surface-2);color:var(--ink);font:14px var(--font-body)}.epc-upload{display:flex;flex-direction:column;gap:7px;border:1px dashed var(--deep);border-radius:10px;padding:12px;font-size:13px;font-weight:700}.epc-upload input{font:13px var(--font-body);max-width:100%}.epc-upload small,.epc-note,.epc-output-head p{font-size:11px;line-height:1.5;color:var(--muted);font-weight:400}.epc-media-preview{display:flex;gap:8px;overflow-x:auto;min-height:48px;align-items:center;color:var(--muted);font-size:12px}.epc-media-preview img,.epc-media-preview video{width:110px;height:76px;object-fit:cover;border-radius:8px;background:var(--surface-2)}.epc-actions{display:flex;gap:7px;flex-wrap:wrap}.epc-btn{border:0;border-radius:8px;background:var(--deep);color:var(--on-deep);font:700 12px var(--font-body);padding:10px 12px;cursor:pointer}.epc-btn.secondary{background:var(--surface-2);border:1px solid var(--line);color:var(--ink)}.epc-note{margin:0;background:var(--surface-2);border-radius:8px;padding:9px}.epc-note.warning{background:var(--warn-bg);color:var(--warn)}.epc-warnings{font-size:12px;line-height:1.5;color:var(--warn);background:var(--warn-bg);padding:10px;border-radius:9px}.epc-results{display:grid;grid-template-columns:repeat(auto-fit,minmax(125px,1fr));gap:8px}.epc-metric{border:1px solid var(--line);background:var(--surface-2);border-radius:10px;padding:10px;min-width:0}.epc-metric span{display:block;font-size:10px;color:var(--muted);text-transform:uppercase;letter-spacing:.04em}.epc-metric b{display:block;font:800 19px var(--font-display);margin-top:3px;overflow-wrap:anywhere}.epc-metric small{font-size:10px;color:var(--muted)}.epc-output{gap:14px}.epc-output-head{display:flex;justify-content:space-between;align-items:flex-start;gap:12px;flex-wrap:wrap}.epc-output-head p{margin:4px 0 0}.epc-layout{min-height:180px;overflow:auto;border:1px solid var(--line);border-radius:10px;background:var(--surface-2);padding:8px}.epc-layout svg{display:block;width:100%;height:auto;min-width:300px;max-height:560px}.epc-empty{padding:45px 12px;text-align:center;color:var(--muted);font-size:13px}.epc-schedule{overflow-x:auto}.epc-schedule table{border-collapse:collapse;width:100%;font-size:12px}.epc-schedule th,.epc-schedule td{text-align:left;padding:8px;border-bottom:1px solid var(--line);white-space:nowrap}.epc-schedule th{color:var(--muted);font-size:10px;text-transform:uppercase}.epc-review{display:grid;grid-template-columns:repeat(auto-fit,minmax(230px,1fr));gap:9px}.epc-review label{display:flex;gap:8px;align-items:flex-start;font-size:12px;color:var(--ink)}.epc-review input{margin-top:2px;accent-color:var(--deep)}@media print{.epc-workspace button,.epc-upload input{display:none!important}.epc-workspace{color:#111}.epc-panel,.epc-head{break-inside:avoid}}';
  var style=document.createElement('style');style.textContent=css;document.head.appendChild(style);
  function save(){var data={mode:mode};ids.forEach(function(id){data[id]=$(id).value});try{localStorage.setItem('gs_epc_auto_design_v1',JSON.stringify(data))}catch(e){}}
  function load(){try{var d=JSON.parse(localStorage.getItem('gs_epc_auto_design_v1')||'{}');if(d.mode)mode=d.mode;ids.forEach(function(id){if(d[id]!=null)$(id).value=d[id]})}catch(e){}setMode(mode)}
  function setMode(m){mode=m;root.querySelectorAll('[data-epc-mode]').forEach(function(b){b.classList.toggle('active',b.getAttribute('data-epc-mode')===mode)});$('epcTitle').textContent=mode==='ground'?'Ground-Mounted Site Survey & Auto-Design':'Rooftop Site Survey & Auto-Design';}
  function metric(label,value,sub){return '<div class="epc-metric"><span>'+safe(label)+'</span><b>'+safe(value)+'</b><small>'+safe(sub||'')+'</small></div>'}
  function generate(){
    var kw=val('epcKw'),wp=val('epcWp'),mw=val('epcModW'),ml=val('epcModL'),len=val('epcLength'),wid=val('epcWidth'),tilt=val('epcTilt'),alt=val('epcSunAlt');
    var warnings=[];
    if(kw<=0||wp<=0||mw<=0||ml<=0){$('epcWarnings').textContent='Enter a positive project capacity, module rating and module dimensions.';return}
    if(tilt<0||tilt>60||alt<5||alt>80){$('epcWarnings').textContent='Check tilt (0–60°) and design sun altitude (5–80°).';return}
    var target=Math.ceil(kw*1000/wp),panelW= $('epcOrientation').value==='portrait'?mw:ml,panelD=$('epcOrientation').value==='portrait'?ml:mw;
    var rad=Math.PI/180,projected=panelD*Math.cos(tilt*rad),rise=panelD*Math.sin(tilt*rad),shadow=rise/Math.tan(Math.max(5,alt)*rad),pitch=projected+shadow;
    var setback=val('epcSetback'),walk=val('epcWalkway'),usableW=Math.max(0,wid-2*setback-walk),usableL=Math.max(0,len-2*setback);
    var cols=wid>0?Math.floor(usableW/panelW):0,rowsAvail=len>0?Math.floor(usableL/pitch):0;
    var panelArea=mw*ml,siteArea=Math.max(0,usableW*usableL-val('epcObstacles')),areaFit=Math.floor(siteArea/panelArea);
    var geometricFit=Math.max(0,cols*rowsAvail),fit=(len>0&&wid>0)?Math.min(geometricFit,areaFit):target;
    var installed=Math.min(target,fit),layoutRows=cols>0?Math.ceil(installed/cols):0,actualKw=installed*wp/1000;
    if(!(len>0&&wid>0))warnings.push('Enter measured site length and width to generate a dimensioned panel layout.');
    if(installed<target)warnings.push('Site fit is limited: '+installed+' of '+target+' required modules fit using the entered setbacks, walkway, obstacle area and row pitch.');
    if(val('epcObstacles')>0)warnings.push('Obstacle area is deducted from total usable area only. Mark exact obstacle positions in the final CAD drawing.');
    if(val('epcLat')===0||val('epcLon')===0)warnings.push('Add verified latitude and longitude for site-specific solar resource and sun-path assessment.');
    var dc=val('epcDcRoute')*2*(1+val('epcCableAllowance')/100),ac=val('epcAcRoute')*3*(1+val('epcCableAllowance')/100);
    var coeff=Math.abs(val('epcVocCoeff'))/100,minTemp=val('epcMinTemp'),vocCold=val('epcVoc')*(1+coeff*Math.max(0,25-minTemp));
    var maxSeries=vocCold>0?Math.floor(val('epcMaxDc')/vocCold):0,strings=maxSeries>0?Math.ceil(installed/maxSeries):0;
    if(val('epcVoc')<=0||val('epcMaxDc')<=0)warnings.push('Enter module Voc and inverter maximum DC voltage for string-length screening.');
    if(maxSeries<1&&installed>0)warnings.push('Module cold-corrected Voc exceeds inverter maximum DC voltage. Do not proceed.');
    if(val('epcInvKw')>0&&actualKw/val('epcInvKw')>1.5)warnings.push('DC/AC ratio exceeds 1.50; verify inverter loading and manufacturer limits.');
    if(val('epcInvKw')<=0)warnings.push('Enter inverter AC capacity to calculate DC/AC ratio.');
    if(len>0&&wid>0&&installed>0){
      var shownRows=Math.ceil(installed/Math.max(1,cols)),shownCols=Math.min(cols,installed),scale=Math.min(760/(wid||1),430/(len||1)),svgW=Math.max(320,wid*scale+70),svgH=Math.max(190,len*scale+70),x0=42,y0=34,rectW=panelW*scale,rectH=projected*scale;
      var s='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 '+svgW+' '+svgH+'" role="img" aria-label="Preliminary solar panel layout"><rect x="'+x0+'" y="'+y0+'" width="'+(wid*scale)+'" height="'+(len*scale)+'" fill="#edf4ef" stroke="#0a6b4f" stroke-width="2"/><text x="'+x0+'" y="18" font-size="11" fill="currentColor">SITE PLAN · '+safe(mode==='ground'?'GROUND MOUNTED':'ROOFTOP')+'</text>';
      var n=0;
      for(var r=0;r<shownRows;r++){
        for(var c=0;c<shownCols&&n<installed;c++){
          var xx=x0+(setback+(mode==='rooftop'?walk:walk/2)+c*panelW)*scale;
          var yy=y0+(setback+r*pitch)*scale;
          if(xx+rectW<=x0+wid*scale&&yy+rectH<=y0+len*scale){
            s+='<rect x="'+xx.toFixed(2)+'" y="'+yy.toFixed(2)+'" width="'+rectW.toFixed(2)+'" height="'+rectH.toFixed(2)+'" rx="1" fill="#0a6b4f" stroke="#f2a900" stroke-width=".7"/>';
            n++;
          }
        }
      }
      s+='<text x="'+(x0+wid*scale/2)+'" y="'+(svgH-12)+'" text-anchor="middle" font-size="11" fill="currentColor">Width '+fmt(wid,2)+' m</text><text x="12" y="'+(y0+len*scale/2)+'" transform="rotate(-90 12 '+(y0+len*scale/2)+')" text-anchor="middle" font-size="11" fill="currentColor">Length '+fmt(len,2)+' m</text><text x="'+(x0+wid*scale-4)+'" y="'+(y0+len*scale-6)+'" text-anchor="end" font-size="10" fill="#0a6b4f">N ↑ (confirm actual north)</text></svg>';
      $('epcLayout').innerHTML=s;
    }else{$('epcLayout').innerHTML='<div class="epc-empty">Enter measured site length and width to generate a dimensioned concept layout.</div>'}
    var railLines=layoutRows*2,supports=val('epcSupportSpan')>0?railLines*(Math.ceil((Math.min(cols,installed)*panelW)/val('epcSupportSpan'))+1):0;
    var ratio=val('epcInvKw')>0?actualKw/val('epcInvKw'):0;
    var results=[
      metric('Target modules',fmt(target,0),'For '+fmt(kw,2)+' kWp target'),
      metric('Modules fitting',fmt(installed,0),'Preliminary usable-area fit'),
      metric('Installed DC',fmt(actualKw,2)+' kWp','Based on fitting modules'),
      metric('Approx. module area',fmt(installed*panelArea,1)+' m²','Excludes access and setbacks'),
      metric('Layout columns × rows',cols&&layoutRows?cols+' × '+layoutRows:'Enter dimensions','Maximum columns / used rows'),
      metric('Row-to-row pitch',fmt(pitch,2)+' m','Shadow geometry estimate'),
      metric('Rail lines',fmt(railLines,0),'2 per module row; concept only'),
      metric('Support points',fmt(supports,0),'Based on entered support span'),
      metric('DC/AC ratio',val('epcInvKw')>0?fmt(ratio,2)+':1':'Not entered','Preliminary only'),
      metric('Max modules / string',maxSeries?fmt(maxSeries,0):'Check inputs','Cold-corrected Voc screen'),
      metric('Estimated string count',strings?fmt(strings,0):'Not available','Current allocation not verified'),
      metric('DC cable pair',fmt(dc,1)+' m','2 × route × allowance'),
      metric('3-phase AC conductors',fmt(ac,1)+' m','3 × route × allowance')
    ];
    $('epcResults').innerHTML=results.join('');
    var summary='<table><thead><tr><th>Item</th><th>Preliminary quantity / value</th><th>Notes</th></tr></thead><tbody>'+
      '<tr><td>PV modules</td><td>'+installed+'</td><td>'+wp+' Wp each; '+fmt(actualKw,2)+' kWp installed</td></tr>'+
      '<tr><td>Module surface area</td><td>'+fmt(installed*panelArea,2)+' m²</td><td>Module dimensions '+mw+' × '+ml+' m</td></tr>'+
      '<tr><td>Mounting rail lines</td><td>'+railLines+'</td><td>Concept estimate only</td></tr>'+
      '<tr><td>Support points</td><td>'+supports+'</td><td>Verify rail section, span, wind and connection design</td></tr>'+
      '<tr><td>String voltage screen</td><td>'+maxSeries+' modules max / string</td><td>Cold Voc '+fmt(vocCold,2)+' V; MPPT current / range not checked</td></tr>'+
      '<tr><td>Estimated strings</td><td>'+strings+'</td><td>Final string allocation needs inverter MPPT design</td></tr>'+
      '<tr><td>DC cable pair</td><td>'+fmt(dc,1)+' m</td><td>Route estimate including allowance; size not selected</td></tr>'+
      '<tr><td>AC phase conductors</td><td>'+fmt(ac,1)+' m</td><td>3-phase route estimate; PE / neutral separate</td></tr>'+
      '</tbody></table>';
    $('epcSchedule').innerHTML=summary;
    $('epcWarnings').textContent=warnings.length?warnings.join(' '):'Preliminary layout generated. All dimensions, equipment limits and engineering checks still require verification.';
    last={mode:mode,customer:$('epcCustomer').value,segment:$('epcSegment').value,lat:val('epcLat'),lon:val('epcLon'),targetKw:kw,wp:wp,modules:installed,actualKw:actualKw,moduleW:mw,moduleL:ml,siteLength:len,siteWidth:wid,tilt:tilt,azimuth:val('epcAzimuth'),rows:layoutRows,cols:cols,pitch:pitch,railLines:railLines,supports:supports,maxSeries:maxSeries,strings:strings,vocCold:vocCold,dcCable:dc,acCable:ac,invKw:val('epcInvKw'),warnings:warnings,siteArea:siteArea,panelArea:panelArea,orientation:$('epcOrientation').value,panelsPerRow:shownCols,layoutReady:len>0&&wid>0};
    save();syncEngineering();
  }
  function syncEngineering(){
    var pairs=[['epcCustomer','engSite'],['epcLat','engLat'],['epcLon','engLon'],['epcKw','engCapacity'],['epcWp','engPanelW'],['epcTilt','engTilt'],['epcAzimuth','engAzimuth']];
    pairs.forEach(function(p){if($(p[1]))$(p[1]).value=$(p[0]).value});
    if($('engMount'))$('engMount').value=mode==='ground'?'Ground mounted':'RCC rooftop';
    pairs.forEach(function(p){if($(p[1]))$(p[1]).dispatchEvent(new Event('input',{bubbles:true}))});
  }
  function csv(){
    if(!last)return '';
    var rows=[['GenSolar EPC preliminary BOM / schedule','Quantity / value','Unit / notes'],['Project',last.customer,''],['Project type',last.mode,''],['Target capacity',last.targetKw,'kWp'],['Installed capacity',last.actualKw,'kWp'],['PV modules',last.modules,'Nos'],['Module rating',last.wp,'Wp'],['Module area',fmt(last.panelArea,3),'m2 each'],['Mounting rail lines',last.railLines,'Concept estimate'],['Support points',last.supports,'Concept estimate'],['Maximum modules per string',last.maxSeries,'Voltage screen only'],['Estimated strings',last.strings,'MPPT allocation not verified'],['DC cable pair',fmt(last.dcCable,1),'m route estimate'],['AC phase conductors',fmt(last.acCable,1),'m route estimate'],['Design review','Required','Structural and electrical engineer approval']];
    return rows.map(function(r){return r.map(function(x){x=String(x==null?'':x);return /[",\n]/.test(x)?'"'+x.replace(/"/g,'""')+'"':x}).join(',')}).join('\n');
  }
  function share(t,title){try{if(window.GenSolarNative&&typeof window.GenSolarNative.shareText==='function'){window.GenSolarNative.shareText(String(t));return}}catch(e){}try{if(navigator.share){navigator.share({title:title||'GenSolar EPC',text:t}).catch(function(){});return}}catch(e){}var w=window.open('','_blank');if(w){w.document.write('<pre style="white-space:pre-wrap">'+safe(t)+'</pre>')}else toast('Sharing is not available on this device.')}
  function dxf(){
    if(!last||!last.layoutReady){toast('Generate a design with measured site dimensions first.');return}
    var lines=['0','SECTION','2','HEADER','9','$INSUNITS','70','6','0','ENDSEC','0','SECTION','2','ENTITIES'];
    function rect(x,y,w,h,layer){var pts=[[x,y],[x+w,y],[x+w,y+h],[x,y+h]];for(var i=0;i<4;i++){var a=pts[i],b=pts[(i+1)%4];lines.push('0','LINE','8',layer,'10',String(a[0]),'20',String(a[1]),'30','0','11',String(b[0]),'21',String(b[1]),'31','0')}}
    rect(0,0,last.siteWidth,last.siteLength,'SITE_BOUNDARY');
    var panelW=last.orientation==='portrait'?last.moduleW:last.moduleL,panelD=(last.orientation==='portrait'?last.moduleL:last.moduleW)*Math.cos(last.tilt*Math.PI/180),n=0;
    for(var r=0;r<last.rows;r++){for(var c=0;c<last.cols&&n<last.modules;c++){var x=.5+c*panelW,y=.5+r*last.pitch;if(x+panelW<=last.siteWidth&&y+panelD<=last.siteLength){rect(x,y,panelW,panelD,'PV_MODULES');n++}}}
    lines.push('0','ENDSEC','0','EOF');share(lines.join('\n'),'GenSolar preliminary DXF R12 layout');
  }
  function sld(){if(!last){toast('Generate the design first.');return}var t='GENSOLAR – PRELIMINARY SINGLE LINE DIAGRAM\n'+last.modules+' PV modules ('+last.actualKw.toFixed(2)+' kWp)\n'+last.strings+' estimated strings; maximum '+last.maxSeries+' modules/string by cold Voc screening\nPV STRINGS → DC COMBINER / DC ISOLATOR + DC SPD (as designed) → INVERTER '+last.invKw+' kW AC → ACDB / MCCB + AC SPD → GENERATION METER / MAIN LT PANEL → GRID / TRANSFORMER (if applicable)\nProvide equipment earthing, module-frame bonding, inverter earthing and lightning protection as per approved design.\nWARNING: This is a block-level draft, not a protection-coordinated SLD. Verify MPPT allocation, Isc, cable sizing, breaker ratings, fault levels, transformer and DISCOM requirements.';share(t,'GenSolar SLD draft')}
  function printReport(){
    if(!last){toast('Generate a design first.');return}
    var rows=[['Project type',last.mode],['Customer',last.customer],['Coordinates',last.lat+', '+last.lon],['Target DC',last.targetKw+' kWp'],['Installed DC',last.actualKw+' kWp'],['Module quantity',last.modules],['Panel rating',last.wp+' Wp'],['Site dimensions',last.siteLength+' m × '+last.siteWidth+' m'],['Tilt / azimuth',last.tilt+'° / '+last.azimuth+'°'],['Rows / columns',last.rows+' / '+last.cols],['Row pitch',last.pitch.toFixed(2)+' m'],['Rail lines / supports',last.railLines+' / '+last.supports],['Max modules/string',last.maxSeries],['Estimated strings',last.strings],['DC cable pair estimate',last.dcCable.toFixed(1)+' m'],['AC phase cable estimate',last.acCable.toFixed(1)+' m']];
    var sheet=$('printSheet');sheet.innerHTML='<h1>GenSolar EPC – Preliminary Engineering Design</h1><p>'+safe(last.customer)+' · '+safe(last.segment)+' · '+safe(last.mode)+'</p><p>Generated '+new Date().toLocaleString('en-IN')+'</p><table>'+rows.map(function(r){return '<tr><td>'+safe(r[0])+'</td><td>'+safe(r[1])+'</td></tr>'}).join('')+'</table><h2>Engineering warnings</h2><ul>'+last.warnings.map(function(w){return '<li>'+safe(w)+'</li>'}).join('')+'</ul><p><b>Important:</b> Preliminary design only. Structural calculations, wind loads, foundation, cable sizing, protection coordination, earthing, lightning protection, grid compliance and final drawings require competent engineer verification.</p>';
    if(window.GenSolarNative&&typeof window.GenSolarNative.printPdf==='function')window.GenSolarNative.printPdf();else window.print();
  }
  root.querySelectorAll('[data-epc-mode]').forEach(function(b){b.addEventListener('click',function(){setMode(b.getAttribute('data-epc-mode'));save()})});
  ids.forEach(function(id){$(id).addEventListener('input',function(){save()});$(id).addEventListener('change',function(){save()})});
  $('epcGenerate').addEventListener('click',generate);
  $('epcReset').addEventListener('click',function(){if(!confirm('Reset all EPC auto-design inputs?'))return;localStorage.removeItem('gs_epc_auto_design_v1');location.reload()});
  $('epcMap').addEventListener('click',function(){var lat=val('epcLat'),lon=val('epcLon');if(!lat||!lon){toast('Enter latitude and longitude first.');return}var url='https://www.google.com/maps?q='+encodeURIComponent(lat+','+lon);if(window.GenSolarNative&&window.GenSolarNative.openUrl)window.GenSolarNative.openUrl(url);else window.open(url,'_blank')});
  $('epcUseEngineering').addEventListener('click',function(){[['engLat','epcLat'],['engLon','epcLon'],['engCapacity','epcKw'],['engPanelW','epcWp'],['engTilt','epcTilt'],['engAzimuth','epcAzimuth'],['engSite','epcCustomer']].forEach(function(p){if($(p[0])&&$(p[0]).value)$(p[1]).value=$(p[0]).value});save();toast('Existing Engineering values copied.')});
  $('epcMedia').addEventListener('change',function(e){var box=$('epcMediaPreview');box.innerHTML='';var files=Array.prototype.slice.call(e.target.files||[]);if(!files.length){box.textContent='No site media selected';return}files.forEach(function(f){var u=URL.createObjectURL(f),el;if(f.type.indexOf('video/')===0){el=document.createElement('video');el.controls=true}else if(f.type.indexOf('image/')===0){el=document.createElement('img');el.alt=f.name}else{return}el.src=u;el.title=f.name;box.appendChild(el)});toast(files.length+' site media file(s) ready for review. Media is not uploaded to cloud yet.')});
  $('epcExportDxf').addEventListener('click',dxf);
  $('epcExportBom').addEventListener('click',function(){if(!last){toast('Generate the design first.');return}share(csv(),'GenSolar BOM and cable schedule')});
  $('epcExportSld').addEventListener('click',sld);
  $('epcPrint').addEventListener('click',printReport);
  load();
})();