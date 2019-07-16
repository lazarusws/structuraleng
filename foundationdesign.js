//--------------------------------------------------------------------------------------
function blank_output() 
{
   document.getElementById( "bearingPressure1" ).innerHTML      = "";

   document.getElementById( "momentcritical_2").innerHTML      = "";

   document.getElementById( "effDepth_2" ).innerHTML         = "";

   document.getElementById( "k2" ).innerHTML      = "";

   document.getElementById( "z2" ).innerHTML         = "";

   document.getElementById( "areaSteel_2" ).innerHTML      = "";

   document.getElementById( "spacingBottomSteelY" ).innerHTML            = "";

   document.getElementById( "areaSteelPro_2" ).innerHTML       = "";

   document.getElementById( "bearingPressure2" ).innerHTML        = "";

   document.getElementById( "momentcritical_1" ).innerHTML         = "";

   document.getElementById( "effDepth_1" ).innerHTML     = "";

   document.getElementById( "k1" ).innerHTML      = "";

   document.getElementById( "z1" ).innerHTML              = "";

   document.getElementById( "areaSteel_1" ).innerHTML         = "";

   document.getElementById( "spacingBottomSteelX" ).innerHTML       = "";

   document.getElementById( "areaSteeProl_1" ).innerHTML        = "";

   document.getElementById( "beamShear_perMeter" ).innerHTML      = "";

   document.getElementById( "beamShear_pressure" ).innerHTML              = "";

   document.getElementById( "steelRatio" ).innerHTML         = "";

   document.getElementById( "concreteShearResis" ).innerHTML       = "";

   document.getElementById( "beamShear" ).innerHTML        = "";

   document.getElementById( "length" ).innerHTML        = "";

   document.getElementById( "PunchingShear" ).innerHTML        = "";

   document.getElementById( "beamShear" ).innerHTML        = "";

   document.getElementById( "punchingShear_pressure" ).innerHTML        = "";


   return true;
}

function reset_page() 
{
   document.getElementById( "digits"    ).value = 6     ;

   document.getElementById( "dl"     ).value = 400.00;

   document.getElementById( "cs1"     ).value = 0.4;

   document.getElementById( "cs2"     ).value = 0.4;

   document.getElementById( "depth"     ).value = 0.5;

   document.getElementById( "breadth"     ).value = 2.5;

   document.getElementById( "intShearAngle"     ).value = 15;

   document.getElementById( "coheFactor"     ).value = 11.0;

   document.getElementById( "overburdenFactor"     ).value = 4.0;

   document.getElementById( "uniweightFactor"     ).value = 1.4;

   document.getElementById( "cohesC"     ).value = 30.0;

   document.getElementById( "uniWeightSoil"     ).value = 18.0; 
     

   
   var selectorBearingSafety = document.getElementById("sfTypeBearing");
   
   selectorBearingSafety.selectedIndex = 1;

   var selectorDeadload = document.getElementById("sfTypeDeadload");

   selectorDeadload.selectedIndex = 2;

   var selectorLiveload = document.getElementById("sfTypeLiveload");

   selectorLiveload.selectedIndex = 3;

   var selectorConcreteType = document.getElementById("ctype");

   selectorConcreteType.selectedIndex = 1;

   var selectorSteelType = document.getElementById("stype");

   selectorSteelType.selectedIndex = 2;

   var selectorBar_dia = document.getElementById("dtype"); 

   selectorBar_dia.selectedIndex = 4;
 
   blank_output();

   return true;
}

//--------------------------------------------------------------------------------------
function input() {

    var selectorBearingSafety = document.getElementById("sfTypeBearing");
    var safetyBearing = selectorBearingSafety[selectorBearingSafety.selectedIndex].value;

    var selectorDeadload = document.getElementById("sfTypeDeadload");
    var safetyDeadload = selectorDeadload[selectorDeadload.selectedIndex].value;

    var selectorLiveload = document.getElementById("sfTypeLiveload");
    var safetyLiveload = selectorLiveload[selectorLiveload.selectedIndex].value;

    var selectorConcreteType = document.getElementById("ctype");
	var fck = selectorConcreteType[selectorConcreteType.selectedIndex].value;
	
	var selectorSteelType = document.getElementById("stype");
	var fyd = selectorSteelType[selectorSteelType.selectedIndex].value;
	
	var selectorBar_dia = document.getElementById("dtype");            //bar diameter  
	var bar_asmm = selectorBar_dia[selectorBar_dia.selectedIndex].value;

    var B = parseFloat(document.getElementById("breadth").value);

    var c = parseFloat(document.getElementById("cohesC").value);         //cohesion in kN/m^2

    var D = parseFloat(document.getElementById("depth").value);

    var gamma = parseFloat(document.getElementById("uniWeightSoil").value);

    var Nc = parseFloat(document.getElementById("coheFactor").value);

    var Nq = parseFloat(document.getElementById("overburdenFactor").value);

    var Ngamma = parseFloat(document.getElementById("uniweightFactor").value); // unit weight of soil in kN/m^2

    var DL = parseFloat(document.getElementById("dl").value);              //Input load in kN

    var LL = parseFloat(document.getElementById("ll").value);

    var colx_m = parseFloat(document.getElementById("cs1").value);

    var coly_m = parseFloat(document.getElementById("cs2").value);

    return { safetyBearing, B, c, DL, LL, Ngamma, Nq, Nc, gamma, D, safetyDeadload, safetyLiveload, colx_m, coly_m, bar_asmm, fyd, fck };


}

function bearing_capacity() {

    var { gamma, D, Nc, gamma, B, Ngamma, c, safetyBearing, Nq }  = input();

    var q = gamma * D;                     //effective overburden stress in kN/m^2

    var qallow_strip_footing = (c * Nc + q * Nq + 0.5 * gamma * B * Ngamma) / safetyBearing

    var qallow_pad_footing = (1.3 * c * Nc + q * Nq + 0.4 * gamma * B * Ngamma) / safetyBearing   //allowable bearing capacity in kN/m^2
    
    return { qallow_pad_footing, qallow_strip_footing };
   
}
function base_area() {

    var {qallow_pad_footing} = bearing_capacity();

    var {B , DL , LL } = input();
  
   /* var DL = input();

    var LL = input();*/

    var l = (DL + LL) / (qallow_pad_footing * B);    //length of the pad foundation in  m

    console.log(l);
    document.getElementById("length").innerHTML = precision(l);

    return {l};
} 

function critical_section() {

    var {colx_m, coly_m, B, D, bar_asmm} = input();

    var { l }= base_area();

    var span_x = (B - colx_m) / 2;

    var span_y = (l - coly_m) / 2;

    var design_span1 = Math.max(span_x, span_y)              //span to the face of the column section in  m

    var design_span2 = Math.min(span_x, span_y) 

    var short_span = Math.min(l,B);      //The arial load multiplied by the short span to be changed in to line load in the direction of the longer span() 

    var long_span = Math.max(l,B)

    var d1 = D - 0.050 - (Math.sqrt((4 * bar_asmm)/ 3.14))/2000;         //effective depth = Slab thickness - slab concrete cover - bar dia
    
    var d2 = D - 0.050 - (Math.sqrt((4 * bar_asmm)/ 3.14)) * 3 /2000;     //effective depth by the reinforcement bar lied on top of the longer span bar 
    
    return { design_span1,design_span2 , short_span , d1 , d2 , long_span};


}


function flexure_design() {    

    var {l}= base_area();

    var {safetyDeadload, safetyLiveload, DL, LL , B, D, fck, fyd, bar_asmm}= input();

    var {design_span1, design_span2, short_span, d1 ,d2 , long_span} = critical_section();

    var designLoad = DL * safetyDeadload + LL* safetyLiveload;

    var ultimateBearing1 = designLoad / (B * l);

    var ultimateBearing2 = designLoad / (B * l);

    var M_ed1 = (ultimateBearing1 * short_span * design_span1 * design_span1) / 2; //longer span direction

    var M_ed2 = (ultimateBearing2 * long_span * design_span2 * design_span2) / 2;  //shorter span direction

    var K1 =  M_ed1 / (short_span * fck * d1 * d1);

    var K2 =  M_ed2 / (long_span * fck * d2 * d2);

    var Z1 = Math.min(((d1/2) * (1 + Math.sqrt(1-3.53 * K1))), 0.95 * d1);

    var Z2 = Math.min(((d2/2) * (1 + Math.sqrt(1-3.53 * K2))), 0.95 * d2);

    var As_mm1 = M_ed1 * 1000000/(Z1 * fyd);           //Area in square mm^2

    var As_mm2 = M_ed2 * 1000000/(Z2 * fyd); 

    var sp_mm_1 = Math.min((short_span * 1000 ) / ((As_mm1 / bar_asmm)-1), 2 * D * 1000, 250)  ;       // saping in mm      recheck this 

    var sp_mm_2 = Math.min(( long_span * 1000 ) / ((As_mm2 / bar_asmm)-1), 2 * D * 1000, 250) ;

    var As_mm_pr_1 = (((short_span * 1000) / sp_mm_1 )+ 1 ) * bar_asmm;  //Area of steel provided
    
    var As_mm_pr_2 = (((long_span * 1000) / sp_mm_2 )+ 1 ) * bar_asmm;
    

    console.log(d1)
    document.getElementById("effDepth_1").innerHTML = precision(d1);

    console.log(d2)
    document.getElementById("effDepth_2").innerHTML = precision(d2);

    console.log(M_ed1);
    document.getElementById("momentcritical_1").innerHTML = precision(M_ed1);

    console.log(M_ed2);
    document.getElementById("momentcritical_2").innerHTML = precision(M_ed2);
    
    console.log(ultimateBearing1);
    document.getElementById("bearingPressure1").innerHTML = precision(ultimateBearing1);

    console.log(ultimateBearing2);
    document.getElementById("bearingPressure2").innerHTML = precision(ultimateBearing2);

    console.log(K1);
    document.getElementById("k1").innerHTML = precision(K1);

    console.log(K2);
    document.getElementById("k2").innerHTML = precision(K2);

    console.log(Z1);
    document.getElementById("z1").innerHTML = precision(Z1);

    console.log(Z2);
    document.getElementById("z2").innerHTML = precision(Z2);

    console.log(As_mm1);
    document.getElementById("areaSteel_1").innerHTML = precision(As_mm1);

    console.log(As_mm2);
    document.getElementById("areaSteel_2").innerHTML = precision(As_mm2);

    console.log(sp_mm_1);
    document.getElementById("spacingBottomSteelX").innerHTML = Math.round(Math.floor(sp_mm_1) / 10) * 10;

    console.log(sp_mm_2);
    document.getElementById("spacingBottomSteelY").innerHTML = Math.round(Math.floor(sp_mm_2) / 10) * 10;

    console.log(As_mm_pr_1);
    document.getElementById("areaSteeProl_1").innerHTML = precision(As_mm_pr_1);

    console.log(As_mm_pr_2);
    document.getElementById("areaSteelPro_2").innerHTML = precision(As_mm_pr_2);
    
    return {ultimateBearing1 ,ultimateBearing2,As_mm_pr_1, As_mm_pr_2, designLoad}; 

    
}

function shear_design () {

    var{fck, colx_m, coly_m} = input();

    var {ultimateBearing1,ultimateBearing2,  As_mm_pr_1, As_mm_pr_2, designLoad} = flexure_design();

    var {design_span1 ,design_span2, d1, d2 , short_span , long_span} =critical_section();

    var d = (d1 + d2)/ 2                                      //average effective depth from the reinforcement bar in two direction 

    //Beam shear check----------------------------------------------------

    var V_ED_kNperM1 = ultimateBearing1 * ( design_span1 - d1); // Out put is in kN/m

    var V_ED_kNperM2 = ultimateBearing2 * ( design_span2 - d2);

    var V_ED_kNperM = Math.max(V_ED_kNperM1,V_ED_kNperM2);

    var V_ED_MPa1 = V_ED_kNperM1 / (d1 * 1000);                 // Out put is in MPa, effective depth should be change in to mm

    var V_ED_MPa2 = V_ED_kNperM2 / (d2 * 1000); 

    var V_ED_MPa = Math.max(V_ED_MPa1, V_ED_MPa2);

    //Punching shear check -------------------------------------------------
 
    var u1 = 2 * (colx_m + coly_m) + 2 * 3.14159 * 2 * d;         //basic control perimetre in meter

    var ved_net = designLoad - ultimateBearing1 * (colx_m * coly_m + 3.14159 * 4 * d * d + 4 * d * (colx_m + coly_m));

    var V_ED_punching = (1 * ved_net) / (u1 * d * 1000);

    //Section shear capacity -------------------------------------------------

    var steel_Ratio1 = ((As_mm_pr_1 / 1000000)/ (short_span * d1)) * 100;    // steel ratio in percent

    var steel_Ratio2 = ((As_mm_pr_2 / 1000000)/ (long_span * d2)) * 100;  

    var steel_Ratio = Math.sqrt(steel_Ratio1 * steel_Ratio2);

    var ratio_for_Vrd = Math.min(steel_Ratio / 100 , 0.02); 

    var kk = 1 + Math.sqrt(0.2 / d); 

    var V_RD_MPa = 0.12 * kk * Math.cbrt( 100 *  ratio_for_Vrd * fck / 1000);    //shear capacity of the concrete in MPa

    var V_RD_MPa_min = 0.035 * Math.pow( kk, 1.5) * Math.sqrt(fck / 1000);

    var V_RD = Math.max(V_RD_MPa,V_RD_MPa_min);

    console.log(V_ED_kNperM);
    document.getElementById("beamShear_perMeter").innerHTML = precision(V_ED_kNperM);

    console.log(V_ED_MPa);
    document.getElementById("beamShear_pressure").innerHTML = precision(V_ED_MPa);

    console.log(steel_Ratio);
    document.getElementById("steelRatio").innerHTML = precision(steel_Ratio);

    console.log(V_RD);
    document.getElementById("concreteShearResis").innerHTML = precision(V_RD);

    console.log(V_ED_punching);
    document.getElementById("punchingShear_pressure").innerHTML = precision(V_ED_punching);

    function beamShear_check() {

    if ( V_ED_MPa <= V_RD) return { shear_section1: "Section size is adequate for beam shear!"};

    return {shear_section1: "Section size is inadequate for beam shear!"};

    }
    
    var {shear_section1} = beamShear_check()

    document.getElementById("beamShear").innerHTML = shear_section1;

    function punchingShear_check(){

    if ( V_ED_punching <= V_RD) return { shear_section2: "Section size is adequate for punching shear!"};

    return {shear_section2: "Section size is inadequate for punching shear!"};

    }    
    
    var {shear_section2} = punchingShear_check()

    document.getElementById("PunchingShear").innerHTML = shear_section2;


}

