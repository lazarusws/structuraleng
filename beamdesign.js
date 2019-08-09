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
   document.getElementById( "effectiveDepthCompression" ).innerHTML = "";
   document.getElementById( "designStatus" ).innerHTML            = "";
   document.getElementById( "shearStress" ).innerHTML            = "";
   document.getElementById( "teta" ).innerHTML                   = "";
   document.getElementById( "strutCot2_5" ).innerHTML            = "";
   document.getElementById( "strutCot1_0" ).innerHTML            = "";
   document.getElementById( "stirrupSpacing" ).innerHTML         = "";
   document.getElementById( "stirrupArea" ).innerHTML            = "";
   document.getElementById( "apers" ).innerHTML                  = "";
   
   
   
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
   document.getElementById( "coverThic").value = 0.025;
   document.getElementById("beamSectionIMG").src="concreteSection.PNG";
   document.getElementById("concreteShearSection").src="concrete shear section.png";

       
   var selectorSteelGrade = document.getElementById("steelType");   
   selectorSteelGrade.selectedIndex = 2;

   var selectorStirrupGrade = document.getElementById("stirrupType");   
   selectorStirrupGrade.selectedIndex = 0;

   var selectorBarDiameter = document.getElementById("barDiaType");
   selectorBarDiameter.selectedIndex = 5;

   var selectorStirrupSize = document.getElementById("stirrupbarDiaType");
   selectorStirrupSize.selectedIndex = 0;

   var selectorConcreteGrade = document.getElementById("concreteType");
   selectorConcreteGrade.selectedIndex = 1;

   var selectorMomentRedistribution = document.getElementById("momentdist");
   selectorMomentRedistribution.selectedIndex = 0;

   var selectorStirrupLeg = document.getElementById("stirrupLeg");
   selectorStirrupLeg.selectedIndex = 0;
 
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
    var c  = parseFloat( document.getElementById( "coverThic" ).value );
    var safetyDeadLoad = parseFloat( document.getElementById( "sfTypeDeadload" ).value );
    var safetyLiveLoad = parseFloat( document.getElementById( "sfTypeLiveload" ).value );
    //selector input
    var	selectorSteelGrade = document.getElementById("steelType");
    var	fyd = selectorSteelGrade[selectorSteelGrade.selectedIndex].value;

    var	selectorStirrupGrade = document.getElementById("stirrupType");
    var	fywd = selectorStirrupGrade[selectorStirrupGrade.selectedIndex].value;

    var	selectorConcreteGrade = document.getElementById("concreteType"); 
    var	fck = selectorConcreteGrade[selectorConcreteGrade.selectedIndex].value;

    var	selectorBarDiameter = document.getElementById("barDiaType"); 
    var	bar_as_mm = selectorBarDiameter[selectorBarDiameter.selectedIndex].value;

    var	selectorStirrupSize = document.getElementById("stirrupbarDiaType"); 
    var	stirrup_bar_as_mm = selectorStirrupSize[selectorStirrupSize.selectedIndex].value;  
    
    var	selectorMomentRedistribution = document.getElementById("momentdist"); 
    var	mom_dis = selectorMomentRedistribution[selectorMomentRedistribution.selectedIndex].value;

    var	selectorStirrupLeg= document.getElementById("stirrupLeg"); 
    var	LegNumber = selectorStirrupLeg[selectorStirrupLeg.selectedIndex].value;


    var d1 = D - c - (Math.sqrt((4 * stirrup_bar_as_mm)/ 3.14))/1000 - (Math.sqrt((4 * bar_as_mm)/ 3.14))/2000;         //effective depth = beam depth -  concrete cover - bar dia/2

    var d2 = c + (Math.sqrt((4 * stirrup_bar_as_mm)/ 3.14))/1000 + (Math.sqrt((4 * bar_as_mm)/ 3.14))/2000;

    console.log(d1);
    document.getElementById("effectiveDepth").innerHTML = precision(d1);

	return {DL, LL, l, D, b, bar_as_mm, fyd, fck, mom_dis, d1, d2, safetyDeadLoad, safetyLiveLoad, stirrup_bar_as_mm, LegNumber, fywd};
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
/*function K_moment_redistribution_limit(){

    var {mom_dis} = input();

    if (mom_dis == 1.0 ) return {k_limit : 0.208};

    if (mom_dis == 0.95) return {k_limit : 0.195}

    if (mom_dis == 0.9 ) return {k_limit : 0.182};

    if (mom_dis == 0.85) return {k_limit : 0.168};

    if (mom_dis == 0.75) return {k_limit : 0.137};

    if (mom_dis == 0.70) return {k_limit : 0.120};

    return {k_limit: NaN};

}*/

    var {k_limit} = K_moment_redistribution_limit();

function brittle_failure_check() {

    var {mom_dis, d1, b, fck} = input();
    
    var {DesignMoment} = designloadAndMoment();

    //var {k_limit} = K_moment_redistribution_limit();

    var k_prime = 0.6 * mom_dis - 0.18 * mom_dis * mom_dis - 0.21;

    var k = DesignMoment/ (b * fck * d1 * d1);     
    
   

    if (k >= 0.21) {       

        //confirm("Brittle failure!, increase the section capacity by either increasing the depth or the concrete grade.");

        alert("Inadequate section! Redesign section - Increase the section capacity by either increasing the depth or the concrete grade.");

        location.reload();
        
       
    } else if (k >= 0.16995) {

        if (mom_dis > 0.85) {

        alert("WARNING! It is recommended to design a doubly reinforced concrete beam (limit moment redistribution to 15% minimum for Class A and 20% to 30% for Class B & C) to ensure ductile failure for the design moment.")
        
        }else {}
    }
    
    else { k = DesignMoment/ (b * fck * d1 * d1) }
    
    console.log(k);
    document.getElementById("reinfCoffi").innerHTML = precision(k);

    console.log(k_prime);
    document.getElementById("underReinforced").innerHTML = precision(k_prime);

    return{k, k_prime};
}
function flexure_design() {

    var {d1, d2,k,b,fck, k_prime, fyd, bar_as_mm, mom_dis} = input();

    var {DesignMoment} = designloadAndMoment();

    var {k, k_prime} = brittle_failure_check();
    
    if (k <= k_prime) {

        var z = Math.min((d1/2) * (1 + Math.sqrt(1 - 3.53 * k)), 0.95 * d1);   

        var As1 = DesignMoment * 1000000/(z * fyd);              //Area in square mm      

        var n1= Math.max(As1 / bar_as_mm, 2);                    //No of bar in tension zone
        
        var As2 = 0;

        var n2 = 0;

        var status = "Singly reinforced"

        var d2 = "N/A"

        document.getElementById("beamSectionIMG").src="singleReinforcement.png";

        console.log(d2);
        document.getElementById("effectiveDepthCompression").innerHTML = d2;

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

    console.log(z);
    document.getElementById("z").innerHTML = precision(z);

    return{z};

} 

function shear_design(){

    var{DesignLoad} = designloadAndMoment();

    var {l , b, d1, stirrup_bar_as_mm, LegNumber , fyd , fck, fywd} = input();

    var V_ED_kN = DesignLoad * l / 2;  //Shear force acts on the beam d length from the face the support(column)

    var v_ED_MPa = V_ED_kN / (1000 * b * 0.9 * d1 );

    console.log(v_ED_MPa);
    document.getElementById("shearStress").innerHTML = precision(v_ED_MPa);

    function strut_capacity(){

        if(fck == 20000 ) return {V_RD_cot2_5 : 2.54, V_RD_cot1_0: 3.68};

        if(fck == 25000 ) return {V_RD_cot2_5 : 3.10, V_RD_cot1_0: 4.50};

        if(fck == 28000 ) return {V_RD_cot2_5 : 3.43, V_RD_cot1_0: 4.97};

        if(fck == 30000 ) return {V_RD_cot2_5 : 3.64, V_RD_cot1_0: 5.28};

        if(fck == 32000 ) return {V_RD_cot2_5 : 3.84, V_RD_cot1_0: 5.58};

        if(fck == 35000 ) return {V_RD_cot2_5 : 4.15, V_RD_cot1_0: 6.02};

        if(fck == 40000 ) return {V_RD_cot2_5 : 4.63, V_RD_cot1_0: 6.72};

        if(fck == 45000 ) return {V_RD_cot2_5 : 5.08, V_RD_cot1_0: 7.38};

        if(fck == 50000 ) return {V_RD_cot2_5 : 5.51, V_RD_cot1_0: 8.00};

       return{V_RD_cot2_5: NaN, V_RD_cot1_0:NaN};

    }

    var{V_RD_cot1_0,V_RD_cot2_5} = strut_capacity();

    if( v_ED_MPa < V_RD_cot2_5){

        var Asw_per_s = (v_ED_MPa * b) * 1000 / (fywd * 2.5 / 1000);

        var stirrup_spacing = Math.min((stirrup_bar_as_mm * LegNumber )/ Asw_per_s, 0.75 * d1 * 1000);

        var Asw_mm = stirrup_bar_as_mm * LegNumber;

        var teta =  21.8;
        
        document.getElementById("concreteShearSection").src="ShearSectionMiniStirrup.png";

    }   else if(v_ED_MPa < V_RD_cot1_0){

        var teta = (0.5 *180/ Math.PI) * (Math.asin( v_ED_MPa/ (0.20 * (fck/1000) * (1 - (fck/250000)))));  // 250 is multiplied by 1000 to make the unit same with fck input which is in MPA   2/ Divided by pi and multiplied by 180 to give an angle value in degree

        var Asw_per_s = (v_ED_MPa * b) * 1000 / ((fywd / (1000 * Math.tan(teta * Math.PI / 180))));  // (1 / Math.tan(teta))

        var stirrup_spacing = Math.min((stirrup_bar_as_mm * LegNumber )/ Asw_per_s, 0.75 * d1 * 1000);

        var Asw_mm = stirrup_bar_as_mm * LegNumber;

        document.getElementById("concreteShearSection").src="shearSectionStirrup.png";

    }else {

        alert("Shear failure! Increase the depth of the beam or the concrete grade.");

        location.reload();

    }
    console.log(teta);
    document.getElementById("teta").innerHTML = precision(teta);

    console.log(V_RD_cot2_5);
    document.getElementById("strutCot2_5").innerHTML = precision(V_RD_cot2_5);

    console.log(V_RD_cot1_0);
    document.getElementById("strutCot1_0").innerHTML = precision(V_RD_cot1_0);

    console.log(stirrup_spacing);
    document.getElementById("stirrupSpacing").innerHTML = Math.floor(stirrup_spacing);

    console.log(Asw_mm);
    document.getElementById("stirrupArea").innerHTML = Math.floor(Asw_mm);
//trial out puts to check the formulas
    
    console.log(Asw_per_s);
    document.getElementById("apers").innerHTML = precision(Asw_per_s);
}

function pagePrint() {
  window.print();
}