javascript:(()=>{
  let showNotification=(msg)=>{
    let notif=document.createElement("div");
    notif.innerText=msg;
    Object.assign(notif.style,{
      position:"fixed",
      bottom:"30px",
      right:"30px",
      background:"#0bc2cf",
      color:"white",
      padding:"15px 20px",
      borderRadius:"12px",
      fontSize:"16px",
      fontFamily:"Arial,sans-serif",
      boxShadow:"0 4px 12px rgba(0,0,0,0.2)",
      zIndex:"9999",
      opacity:"0",
      transition:"opacity 0.3s ease"
    });
    document.body.appendChild(notif);
    setTimeout(()=>notif.style.opacity="1",100);
    setTimeout(()=>{notif.style.opacity="0";setTimeout(()=>notif.remove(),500)},4000);
  };

  const s=1730769907313;
  const f=async()=>{
    try {
      const e=(min,max)=>Math.floor(Math.random()*(max-min+1))+min;
      const sets=["60101da869e8c70013913b59","625db660c6842334835cb4c6","60268f8861bd520016eae038","611e6c804abdf900668699e3","60ba5ff6077eb600221b7145","642467af9b704783215c1f1b","605bd360e35779001bf57c5e","6234cc7add097ff1c9cff3bd","600b1491d42a140004d5215a","5db75fa3f1fa190017b61c0c","5fac96fe2ca0da00042b018f","600b14d8d42a140004d52165","5f88953cdb209e00046522c7","600b153ad42a140004d52172","5fe260e72a505b00040e2a11","5fe3d085a529560004cd3076","5f5fc017aee59500041a1456","608b0a5863c4f2001eed43f4","5fad491512c8620004918ace","5fc91a9b4ea2e200046bd49a","5c5d06a7deebc70017245da7","5ff767051b68750004a6fd21","5fdcacc85d465a0004b021b9","5fb7eea20bd44300045ba495"];
      const setId=sets[Math.floor(Math.random()*sets.length)];
      
      if(!window.location.href.includes("play.blooket.com")){
        window.open("https://play.blooket.com/");
        return;
      }

      const t=(await fetch("https://play.blooket.com/api/playersessions/solo",{
        body:JSON.stringify({gameMode:"Factory",questionSetId:setId}),
        method:"POST",
        credentials:"include"
      }).then(r=>r.json()))["t"];

      await fetch("https://play.blooket.com/api/playersessions/landings",{
        body:JSON.stringify({t}),
        method:"POST",
        credentials:"include"
      });

      await fetch("https://play.blooket.com/api/playersessions/questions?t="+t,{credentials:"include"});
      await fetch("https://play.blooket.com/api/gamequestionsets?gameId="+setId,{credentials:"include"});

      await fetch("https://play.blooket.com/api/users/factorystats",{
        body:JSON.stringify({
          t,
          place:1,
          cash:e(1e7,1e8),
          playersDefeated:0,
          correctAnswers:e(500,2e3),
          upgrades:e(250,750),
          blookUsed:"Chick",
          nameUsed:"You",
          mode:"Time-Solo"
        }),
        method:"PUT",
        credentials:"include"
      });

      const res=await fetch("https://play.blooket.com/api/users/add-rewards",{
        body:JSON.stringify({t,addedTokens:500,addedXp:300}),
        method:"PUT",
        credentials:"include"
      }).then(r=>r.json());

      showNotification(`✅ Added max tokens & XP!\n🎉 Daily spin tokens: ${res.dailyReward}`);
    } catch(err){
      showNotification("❌ error running cheat.");
    }
  };

  let b=new Image;
  b.src="https://raw.githubusercontent.com/Blooket-Council/Blooket-Cheats/main/autoupdate/timestamps/global/getDailyRewards.png?"+Date.now();
  b.crossOrigin="Anonymous";

  b.onload=()=>{
    let ctx=document.createElement("canvas").getContext("2d");
    ctx.drawImage(b,0,0,b.width,b.height);
    let data=ctx.getImageData(0,0,b.width,b.height).data,a="",ch,last="";
    for(let i=0;i<data.length;){
      ch=String.fromCharCode(data[i%4==3&&i++,i++]+256*data[i%4==3&&i++,i++]);
      if(a+=ch,ch==="/"&&last==="*")break;
      last=ch;
    }
    let r=s,msg="Can't check for updates. Run cheat anyway?";
    try{[,r,msg]=a.match(/LastUpdated: (.+?); ErrorMessage: "((.|\n)+?)"/)}catch(e){}
    (parseInt(r)<=s)&&f();
  };

  b.onerror=b.onabort=()=>{
    b.onerror=b.onabort=null;
    f();
    showNotification("⚠️ GitHub is blocked/down. Cheat still running.");
  };
})();
