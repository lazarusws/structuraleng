function blank_output() {
   document.getElementById( "effectiveDepth" ).innerHTML          = "";
   document.getElementById( "designLoad").innerHTML               = "";
   document.getElementById( "designMoment" ).innerHTML            = "";
   document.getElementById( "reinfCoffi" ).innerHTML              = "";
   document.getElementById( "underReinforced" ).innerHTML         = "";
   document.getElementById( "as1" ).innerHTML                     = "";
   document.getElementById( "as2" ).innerHTML                     = "";
   document.getElementById( "tensionBar" ).innerHTML              = "";
   document.getElementById( "compressionBar" ).innerHTML          = "";
   document.getElementById( "effectiveDepthCompression" ).innerHTML          = "";
   document.getElementById( "designStatus" ).innerHTML            = "";
  
   
   
   return true;
}

function reset_page() {
   document.getElementById( "deadLoad"    ).value = 4.0;
   document.getElementById( "liveLoad"    ).value = 2.0;
   document.getElementById( "length"      ).value = 6.0;
   document.getElementById( "depth"       ).value  =0.6;
   document.getElementById( "breadth"     ).value = 0.4;
   document.getElementById( "sfTypeDeadload").value = 1.35;
   document.getElementById( "sfTypeLiveload").value = 1.5;
   document.getElementById("beamSectionIMG").src="concreteSection.PNG";
       
   var selectorBearingSafety = document.getElementById("steelType");   
   selectorBearingSafety.selectedIndex = 2;

   var selectorDeadload = document.getElementById("barDiaType");
   selectorDeadload.selectedIndex = 4;

   var selectorDeadload = document.getElementById("stirrupbarDiaType");
   selectorDeadload.selectedIndex = 0;

   var selectorLiveload = document.getElementById("concreteType");
   selectorLiveload.selectedIndex = 1;

   var selectorConcreteType = document.getElementById("momentdist");
   selectorConcreteType.selectedIndex = 0;
 
   blank_output();

   return true;
}

function input(){

    //Value input
    var DL = parseFloat( document.getElementById( "deadLoad"  ).value );
    var LL = parseFloat( document.getElementById( "liveLoad" ).value );
    var l  = parseFloat( document.getElementById( "length" ).value );
    var D  = parseFloat( document.getElementById( "depth" ).value );
    var b  = parseFloat( document.getElementById( "breadth" ).value );
    var safetyDeadLoad = parseFloat( document.getElementById( "sfTypeDeadload" ).value );
    var safetyLiveLoad = parseFloat( document.getElementById( "sfTypeLiveload" ).value );
    //selector input
    var	selectorSteelGrade = document.getElementById("steelType");
    var	fyd = selectorSteelGrade[selectorSteelGrade.selectedIndex].value;

    var	selectorConcreteGrade = document.getElementById("concreteType"); 
    var	fck = selectorConcreteGrade[selectorConcreteGrade.selectedIndex].value;

    var	selectorBarDiameter = document.getElementById("barDiaType"); 
    var	bar_as_mm = selectorBarDiameter[selectorBarDiameter.selectedIndex].value;

    var	selectorStirrup = document.getElementById("stirrupbarDiaType"); 
    var	stirrup_bar_as_mm = selectorStirrup[selectorStirrup.selectedIndex].value;  
    
    var	selectorMomentRedistribution = document.getElementById("momentdist"); 
    var	mom_dis = selectorMomentRedistribution[selectorMomentRedistribution.selectedIndex].value;


    var d1 = D - 0.025 - (Math.sqrt((4 * stirrup_bar_as_mm)/ 3.14))/1000 - (Math.sqrt((4 * bar_as_mm)/ 3.14))/2000;         //effective depth = beam depth -  concrete cover - bar dia/2

    var d2 = 0.025 + (Math.sqrt((4 * stirrup_bar_as_mm)/ 3.14))/1000 + (Math.sqrt((4 * bar_as_mm)/ 3.14))/2000;

    console.log(d1);
    document.getElementById("effectiveDepth").innerHTML = precision(d1);

	return {DL, LL, l, D, b, bar_as_mm, fyd, fck, mom_dis, d1, d2, safetyDeadLoad, safetyLiveLoad, stirrup_bar_as_mm};
}
function designloadAndMoment() {

    var {DL,LL, safetyLiveLoad, safetyDeadLoad, l} = input()

    var DesignLoad =  safetyDeadLoad * DL + safetyLiveLoad* LL;
    
    var DesignMoment = (DesignLoad * l * l) / 8;
    
    console.log(DesignLoad);
    document.getElementById("designLoad").innerHTML = precision( DesignLoad );
    
    console.log(DesignMoment);
    document.getElementById("designMoment").innerHTML = precision( DesignMoment );

    return {DesignLoad, DesignMoment};
}
function under_reinforcement_check() {

    var {mom_dis, d1, b, fck} = input();
    
    var {DesignMoment} = designloadAndMoment();

    var k_prime = 0.6 * mom_dis - 0.18 * mom_dis * mom_dis - 0.21;

    var k = DesignMoment/ (b * (fck/1.5) * d1 * d1);      

    if (k >= 1 / 3.53 ) {       

        alert("Brittle failure!, increase the section capacity by either increasing the depth or the concrete grade.");

        reset_page() ;
       
    }else { k = DesignMoment/ (b * (fck/1.5) * d1 * d1) }
    
    console.log(k);
    document.getElementById("reinfCoffi").innerHTML = precision(k);

    console.log(k_prime);
    document.getElementById("underReinforced").innerHTML = precision(k_prime);

    return{k, k_prime};
}
function flexure_design() {

    var {d1, d2,k,b,fck, k_prime, fyd, bar_as_mm, mom_dis} = input();

    var {DesignMoment} = designloadAndMoment();

    var {k, k_prime} = under_reinforcement_check();

   /* if (k >= 1 / 3.53 ) {       

        reset_page() ;
       
    }else { k = DesignMoment/ (b * (fck/1.5) * d1 * d1) }*/
    
    if (k <= k_prime) {

        var z = Math.min((d1/2) * (1 + Math.sqrt(1 - 3.53 * k)), 0.95 * d1);   

        var As1 = DesignMoment * 1000000/(z * fyd);              //Area in square mm      

        var n1= Math.max(As1 / bar_as_mm, 2);                    //No of bar in tension zone
        
        var As2 = 0;

        var n2 = 0;

        var status = "Singly reinforced"

        document.getElementById("beamSectionIMG").src="singleReinforcement.png";

    } else{

        var z = (d1/2) * (1 + Math.sqrt(1 - 3.53 * k_prime));
        
        var x = (mom_dis - 0.4) * d1;

        var fsc = Math.min(700 * 1000 * (x - d2) / x, fyd);        //Multiplied by 1000 to make the unit of fsc same with fyd

        var M_prime =  b * d1 * d1 * fck * (k - k_prime ); 

        var As2 = (M_prime * 1000000) / (fyd * (d1 - d2));

        var As1 = (k_prime * fck * b * d1 * d1 * 1000000)/(z * fyd) + As2 * fsc/fyd;              //Area in square mm      

        var n1= Math.max(As1 / bar_as_mm, 2);

        var n2 = Math.max(As2 / bar_as_mm, 2);

        var status = "Doubly reinforced"

        document.getElementById("beamSectionIMG").src="doubleReinforcement.png";

        console.log(d2);
        document.getElementById("effectiveDepthCompression").innerHTML = precision(d2);
    } 
    console.log(As1);
    document.getElementById("as1").innerHTML = precision(As1);

    console.log(As2);
    document.getElementById("as2").innerHTML = precision(As2);
    
    console.log(n1);
    document.getElementById("tensionBar").innerHTML = Math.ceil(n1);

    console.log(n2);
    document.getElementById("compressionBar").innerHTML = Math.ceil(n2);

    console.log(status);
    document.getElementById("designStatus").innerHTML = status;

} 

