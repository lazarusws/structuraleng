//------------------------------------------------------------------------------------------------------------------------------------
function blank_output() 
{
    document.getElementById( "length"                ).innerHTML        = "";      
    document.getElementById( "bearingPressure2"      ).innerHTML        = ""; 
    document.getElementById( "momentcritical_2"      ).innerHTML        = "";   
    document.getElementById( "effDepth_2"            ).innerHTML        = "";   
    document.getElementById( "k2"                    ).innerHTML        = "";   
    document.getElementById( "areaSteel_2"           ).innerHTML        = "";   
    document.getElementById( "spacingBottomSteelY"   ).innerHTML        = "";   
    document.getElementById( "areaSteelPro_2"        ).innerHTML        = "";
    document.getElementById( "bearingPressure1"      ).innerHTML        = "";  
    document.getElementById( "momentcritical_1"      ).innerHTML        = "";   
    document.getElementById( "effDepth_1"            ).innerHTML        = "";   
    document.getElementById( "k1"                    ).innerHTML        = "";
    document.getElementById( "areaSteel_1"           ).innerHTML        = "";
    document.getElementById( "spacingBottomSteelX"   ).innerHTML        = "";   
    document.getElementById( "areaSteeProl_1"        ).innerHTML        = "";   
    document.getElementById( "beamShear_perMeter"    ).innerHTML        = ""; 
    document.getElementById( "beamShear"             ).innerHTML        = "";   
    document.getElementById( "beamShear_pressure"    ).innerHTML        = "";  
    document.getElementById( "HintBeamShear"         ).innerHTML        = ""; 
    document.getElementById("punchingShear_perMeter" ).innerHTML        = "";
    document.getElementById( "PunchingShear"         ).innerHTML        = ""; 
    document.getElementById("punchingShear_pressure" ).innerHTML        = "";
    document.getElementById( "HintPunchingShear"     ).innerHTML        = "";  
    document.getElementById( "steelRatio"            ).innerHTML        = "";
    document.getElementById( "concreteShearResis"    ).innerHTML        = ""; 
    document.getElementById( "maximumShearAtColumnFace").innerHTML      = "";
    document.getElementById( "concMaxShearResis"     ).innerHTML        = ""; 
    document.getElementById("PunchingShearMax"       ).innerHTML        = "";        
    document.getElementById("HintPunchingShearMax"   ).innerHTML        = "" ;
    
   return true;
}
//-------------------------------------------------------------------------------------------------------------------------------------
function reset_page() 
{
    document.getElementById( "digits"                ).value             = 6;   
    document.getElementById( "cs1"                   ).value             = 0.4;   
    document.getElementById( "cs2"                   ).value             = 0.4;   
    document.getElementById( "depth"                 ).value             = 0.5;   
    document.getElementById( "breadth"               ).value             = 2.0;
    document.getElementById( "coverThic"             ).value             = 0.050;
    document.getElementById( "sfTypeDeadload"        ).value             = 1.35;    
    document.getElementById( "deadLoad"              ).value             = 400.00;
    document.getElementById( "sfTypeLiveload"        ).value             = 1.5;    
    document.getElementById( "liveLoad"              ).value             = 600.00;   
    document.getElementById( "shearAngle"            ).value             = 20;   
    document.getElementById( "cohesC"                ).value             = 30.0;   
    document.getElementById( "uniWeightSoil"         ).value             = 18.0; 
    document.getElementById( "bearingSafetyFactor"   ).value             = 2.5;
    document.getElementById("waterTableCheck"        ).checked           = false; 
    document.getElementById( "waterTableInput"       ).value             = "";

    
   
    var selectorConcreteType = document.getElementById("ctype");   
    selectorConcreteType.selectedIndex = 1;
   
    var selectorSteelType = document.getElementById("stype");  
    selectorSteelType.selectedIndex = 2;
   
    var selectorBar_dia = document.getElementById("dtype");    
    selectorBar_dia.selectedIndex = 4; 

    var selectorWaterTable = document.getElementById("waterTable");
    selectorWaterTable.selectedIndex = 0
   
    blank_output();

    return true;
}
//----------------------------------------------------------------------------------------------------------------------------------------
function input() {

    var selectorConcreteType = document.getElementById("ctype");
    var fck = selectorConcreteType[selectorConcreteType.selectedIndex].value;	
    
	var selectorSteelType = document.getElementById("stype");
    var fyd = selectorSteelType[selectorSteelType.selectedIndex].value;	
    
	var selectorBar_dia = document.getElementById("dtype");                                               //bar diameter  
    var bar_asmm = selectorBar_dia[selectorBar_dia.selectedIndex].value;

    var selectorWaterTable = document.getElementById("waterTable");
    var GWL = selectorWaterTable[selectorWaterTable.selectedIndex].value;	

    var angleShear     = parseFloat(document.getElementById("shearAngle"          ).value);    
    var B              = parseFloat(document.getElementById("breadth"             ).value);
    var cover          = parseFloat(document.getElementById("coverThic"           ).value);
    var c              = parseFloat(document.getElementById("cohesC"              ).value);               //cohesion in kN/m^2
    var D              = parseFloat(document.getElementById("depth"               ).value); 
    var safetyDeadload = parseFloat(document.getElementById("sfTypeDeadload"      ).value);
	var safetyLiveload = parseFloat(document.getElementById("sfTypeLiveload"      ).value);
    var gamma          = parseFloat(document.getElementById("uniWeightSoil"       ).value);   
    var safetyBearing  = parseFloat(document.getElementById("bearingSafetyFactor" ).value);
    var DL             = parseFloat(document.getElementById("deadLoad"            ).value);              //Input load in kN
    var LL             = parseFloat(document.getElementById("liveLoad"            ).value);
    var colx_m         = parseFloat(document.getElementById("cs1"                 ).value);
    var coly_m         = parseFloat(document.getElementById("cs2"                 ).value);
    var H              = parseFloat(document.getElementById("heightD"             ).value);     
    var gwl_depth      = parseFloat(document.getElementById("waterTableInput"     ).value);

    return {B, c, DL, LL, gamma, D, H, safetyDeadload, safetyLiveload, colx_m, coly_m, bar_asmm, fyd, fck, cover, angleShear, safetyBearing,  GWL, gwl_depth};
}
//------------------------------------------------------------------------------------------------------------------------------------------
    
 
function water_table(){

    var {B, H, GWL, gwl_depth} = input();
        
    var checkBox = document.getElementById("waterTableCheck");
        
    if (checkBox.checked == true){

        if ( gwl_depth >= 0.0){}     else{alert( "Invalid ground water level input (a/b) !")};

        if (GWL == 1){

            var Rw1 = Math.min(1 - 0.5 * ( gwl_depth / H ), 1);
        
            var Rw2 = 1
        
         }else{
        
            var Rw1 = 1
        
            var Rw2 = Math.min(0.5 + 0.5 * (gwl_depth / B), 1);
         };
        
    } else {
            
        var Rw1 = 1;        
            
        var Rw2 = 1;
        
    }     
        return {Rw1,Rw2}        
    }

	
//------------------------------------------------------------------------------------------------------------------------------------------
function bearing_capacity() {    

function bearing_capacity_factor(){

    var {angleShear} = input();

    if (angleShear <= 0 ) return {Nc: 5.0 , Nq: 1.0 , Ngamma: 0.0  }; 
    if (angleShear <= 5 ) return {Nc: 6.5 , Nq: 1.5 , Ngamma: 0.0  };
    if (angleShear <= 10) return {Nc: 8.5 , Nq: 2.5 , Ngamma: 0.0  };
    if (angleShear <= 15) return {Nc: 11.0, Nq: 4.0 , Ngamma: 1.4  };
    if (angleShear <= 20) return {Nc: 15.5, Nq: 6.5 , Ngamma: 3.5  };
    if (angleShear <= 25) return {Nc: 21.0, Nq: 10.5, Ngamma: 8.0  };
    if (angleShear <= 30) return {Nc: 30.0, Nq: 18.5, Ngamma: 17.0 };
    if (angleShear <= 35) return {Nc: 45.0, Nq: 34.0, Ngamma: 40.0 };
    if (angleShear <= 40) return {Nc: 75.0, Nq: 65.0, Ngamma: 98.0 };

    return {Nc:NaN, Nq:NaN, Ngamma:NaN};
}
var {Nc, Nq, Ngamma} = bearing_capacity_factor();

var { gamma,H, B, c, safetyBearing}  = input();

var {Rw1,Rw2} = water_table();

    var q = gamma * H;                                                                            //effective overburden stress in kN/m^2

    var qallow_pad_footing = (1.3 * c * Nc + q * Nq * Rw1+ 0.4 * gamma * B * Ngamma * Rw2) / safetyBearing   //allowable bearing capacity in kN/m^2
    
    return { qallow_pad_footing };
}
//----------------------------------------------------------------------------------------------------------------------------------------------
function base_area() {

    var {qallow_pad_footing} = bearing_capacity();

    var {B , DL , LL } = input();

    var l = (DL + LL * 1.3) / (qallow_pad_footing * B);                                           //length of the pad foundation in  m

    console.log(l);
    document.getElementById("length").innerHTML = precision(l);
    
    return {l};
} 
//----------------------------------------------------------------------------------------------------------------------------------------------
function critical_section() {

    var {colx_m, coly_m, B, D, bar_asmm, cover} = input();

    var { l }= base_area();

    var span_x = (B - colx_m) / 2;

    var span_y = (l - coly_m) / 2;

    var design_span1 = Math.max(span_x, span_y)                                                  //span to the face of the column section in  m

    var design_span2 = Math.min(span_x, span_y) 
 
    var short_span = Math.min(l,B);                                       //The arial load multiplied by the short span to be changed in to line load in the direction of the longer span() 

    var long_span = Math.max(l,B)

    var d1 = D - cover - (Math.sqrt((4 * bar_asmm)/ 3.14))/2000;          //effective depth = Slab thickness - slab concrete cover - bar dia
    
    var d2 = D - cover - (Math.sqrt((4 * bar_asmm)/ 3.14)) * 3 /2000;     //effective depth by the transveral reinforcement bar lied on top of the longer span bar (3/2dia = 1 dia +1/2 dia transverse)
    
    return { design_span1,design_span2 , short_span , d1 , d2 , long_span};

}
//----------------------------------------------------------------------------------------------------------------------------------------------
function desig_Load_and_moment(){

    var {safetyDeadload, safetyLiveload, DL, LL, B, fck, colx_m, coly_m}= input();

    var {design_span1, design_span2, short_span, long_span, d1 ,d2 } = critical_section();

    var {l}= base_area();

    var designLoad = DL * safetyDeadload + LL* safetyLiveload;

    var Nc_Rd = (colx_m * coly_m) * fck / 1.5;                                 //Column cross section axial force resistance check 

    if  (Nc_Rd <= designLoad){

        alert("Column section is not adequate to resist the concentric load. Increase the section capacity by either increasing the cross section area of the column or the concrete grade.");

        location.reload();

    }else {};

    var ultimateBearing1 = designLoad / (B * l);

    var ultimateBearing2 = designLoad / (B * l);

    var M_ed1 = (ultimateBearing1 * short_span * design_span1 * design_span1) / 2; //longer span direction

    var M_ed2 = (ultimateBearing2 * long_span * design_span2 * design_span2) / 2;  //shorter span direction

    var K1 =  M_ed1 / (short_span * fck * d1 * d1);

    var K2 =  M_ed2 / (long_span * fck * d2 * d2);

    var k_prime = 0.6 * 0.85 - 0.18 * 0.85 * 0.85 - 0.21;               // ductility bis insured by 15% moment distribution of moments 

    if (Math.max( K1 , K2 ) >= k_prime ) {       

        //confirm("Brittle failure!, increase the section capacity by either increasing the depth or the concrete grade.");

        alert("Brittle failure!, increase the section capacity by either increasing the depth or the concrete grade.");

        location.reload();
       
	}else {
        var K1 =  M_ed1 / (short_span * fck * d1 * d1);

        K2 =  M_ed2 / (long_span * fck * d2 * d2)
    
        if (B*l> 16){

            alert("Consider changing the type of foundation. It is recommended to deswign a raft foundation large area of footing pad");
        
        }else {}
    }
    
    return {designLoad, M_ed1, M_ed2, ultimateBearing1, ultimateBearing2, K1,K2};

}
//-------------------------------------------------------------------------------------------------------------------------------------------
function flexure_design() {      

    var { D, B, c, DL, LL, fyd, H, safetyDeadload, safetyLiveload, colx_m, coly_m, cover, angleShear, safetyBearing, gwl_depth, bar_asmm, fck, gamma}= input();

    var {short_span, d1 ,d2 , long_span} = critical_section();

    var {designLoad, M_ed1, M_ed2, ultimateBearing1, ultimateBearing2, K1, K2} =  desig_Load_and_moment(); 
    
    if ( D > 0.0){}             else{alert( "Invalid footing depth input !")};
	if ( cover > 0.0){}         else{alert( "Invalid concrete cover thickness input !")};
	if ( safetyDeadload > 0.0){}else{alert( "Invalid dead load safety factor input !")};
	if ( safetyLiveload > 0.0){}else{alert( "Invalid live load safety factor input !")};
	if ( DL >= 0.0){}            else{alert( "Invalid dead load input !")};
	if ( LL >= 0.0){}            else{alert( "Invalid live load input !")};
	if ( B > 0.0){}             else{alert( "Invalid footing width input (x axis) !")};
    if ( H >= 0.0){}             else{alert( "Invalid foundation depth input (Df) !")};   
	if ( angleShear >= 0.0){}    else{alert( "Invalid internal shear angle input !")};
	if ( safetyBearing > 0.0){} else{alert( "Invalid bearing safety factor input !")};
	if ( colx_m > 0.0){}        else{alert( "Invalid column dimension input (x axis) !")};
    if ( coly_m > 0.0){}        else{alert( "Invalid column dimension input (y axis) !")};	
    if ( gamma > 0.0){}         else{alert( "Invalid unit weight of soil input !")};
	if ( c >= 0.0){}             else{alert( "Invalid cohesion factor input (c) !")};	



    var fctm  = 0.3 * Math.cbrt(fck * fck / 1000000);

    var Z1 = Math.min(((d1/2) * (1 + Math.sqrt(1-3.53 * K1))), 0.95 * d1);

    var Z2 = Math.min(((d2/2) * (1 + Math.sqrt(1-3.53 * K2))), 0.95 * d2);

    var As_mm1 = M_ed1 * 1000000/(Z1 * fyd);           //Area in square mm^2

    var As_mm1_minimum = Math.max((0.26 * fctm * short_span * d1 * 1000000) / (fyd * 1.15 /1000), 0.0013 *short_span * d1 * 1000000);

    var As_1 = Math.max(As_mm1, As_mm1_minimum);

    var As_mm2 = M_ed2 * 1000000/(Z2 * fyd); 

    var As_mm2_minimum = Math.max((0.26 * fctm * long_span * d2 * 1000000) / (fyd * 1.15 / 1000),0.0013 *long_span * d2 * 1000000);

    var As_2 =  Math.max(As_mm2, As_mm2_minimum);

    var sp_mm_1 = Math.min((short_span * 1000 ) / ((As_1 / bar_asmm) -1), 2 * D * 1000, 250);       // spacing in mm      recheck this 

    var sp_1 = Math.max(sp_mm_1, Math.sqrt(4* bar_asmm/ Math.PI), 20);                                 //Check minimum spacing in mm

    var sp_mm_2 = Math.min(( long_span * 1000 ) / ((As_2 / bar_asmm) -1), 2 * D * 1000, 250) ;

    var sp_2 = Math.max(sp_mm_2, Math.sqrt(4* bar_asmm/ Math.PI), 20);                                 //Check minimum spacing in mm

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

    console.log(As_1);
    document.getElementById("areaSteel_1").innerHTML = precision(As_1);

    console.log(As_2);
    document.getElementById("areaSteel_2").innerHTML = precision(As_2);

    console.log(sp_1);
    document.getElementById("spacingBottomSteelX").innerHTML = Math.round(Math.floor(sp_1) / 10) * 10;

    console.log(sp_2);
    document.getElementById("spacingBottomSteelY").innerHTML = Math.round(Math.floor(sp_2) / 10) * 10;

    console.log(As_mm_pr_1);
    document.getElementById("areaSteeProl_1").innerHTML = precision(As_mm_pr_1);

    console.log(As_mm_pr_2);
    document.getElementById("areaSteelPro_2").innerHTML = precision(As_mm_pr_2);

    console.log(As_mm_pr_2);

    return {ultimateBearing1 ,ultimateBearing2,As_mm_pr_1, As_mm_pr_2, designLoad}; 
}
//----------------------------------------------------------------------------------------------------------------------------------
function shear_design () {

    var{fck, colx_m, coly_m} = input();

    var {ultimateBearing1,ultimateBearing2,  As_mm_pr_1, As_mm_pr_2, designLoad} = flexure_design();

    var {design_span1 ,design_span2, d1, d2 , short_span , long_span} =critical_section();

    var d = (d1 + d2)/ 2                                                //average effective depth from the reinforcement bar in two direction 

    //Section shear capacity -------------------------------------------------

    var steel_Ratio1 = ((As_mm_pr_1 / 1000000)/ (short_span * d1)) * 100;    // steel ratio in percent

    var steel_Ratio2 = ((As_mm_pr_2 / 1000000)/ (long_span * d2)) * 100;  

    var steel_Ratio = Math.sqrt(steel_Ratio1 * steel_Ratio2);

    var ratio_for_Vrd = Math.min(steel_Ratio / 100 , 0.02); 

    var kk = Math.min((1 + Math.sqrt(0.2 / d)),2.0); 

    var V_RD_MPa = 0.12 * kk * Math.cbrt( 100 *  ratio_for_Vrd * fck / 1000);    //shear capacity of the concrete in MPa

    var V_RD_MPa_min = 0.035 * Math.pow( kk, 1.5) * Math.sqrt(fck / 1000);

    var V_RD = Math.max(V_RD_MPa,V_RD_MPa_min);

    //Beam shear check----------------------------------------------------

    var V_ED_kNperM1 = ultimateBearing1 * short_span * ( design_span1 - d1);        // Out put is in kN/m

    var V_ED_kNperM2 = ultimateBearing2 * ( design_span2 - d2);

    var V_ED_kNperM = Math.max(V_ED_kNperM1,V_ED_kNperM2);

    var V_ED_MPa1 = V_ED_kNperM1 / (d1 * 1000);                         // Out put is in MPa, effective depth should be change in to mm

    var V_ED_MPa2 = V_ED_kNperM2 / (d2 * 1000); 

    var V_ED_MPa = Math.max(V_ED_MPa1, V_ED_MPa2);

    if (design_span1 >= d){

        function beamShear_check() {

            if ( V_ED_MPa <= V_RD) return { shear_section1: "Section size is adequate for beam shear!".fontcolor("green"), hint1 : "Safe against beam shear".fontcolor("green")};
    
            return {shear_section1: "Section size is inadequate for beam shear!".fontcolor("red"), hint1 :"Hint, make the width and length proportionate.".fontcolor("red")};        
    
        }
        var {shear_section1, hint1} = beamShear_check();

    }else{

        var shear_section1 = "Beam shear critical section is outside the footing zone".fontcolor("brown");

        var hint1 = "Safe against beam shear".fontcolor("brown");

    }
        
    document.getElementById("beamShear"    ).innerHTML = shear_section1;
        
    document.getElementById("HintBeamShear").innerHTML = hint1;

    //Punching shear check -------------------------------------------------
 
    var u1 = 2 * (colx_m + coly_m) + 2 * 3.14159 * 2 * d;         //basic control perimetre in meter

    var u0 = 2 * (colx_m + coly_m) ;                             //perimetre of the column in meter

    var ved_net = Math.abs(designLoad - ultimateBearing1 * (colx_m * coly_m + 3.14159 * 4 * d * d + 4 * d * (colx_m + coly_m)));

    var ved_net_under_column = Math.abs(designLoad - ultimateBearing1 * (colx_m * coly_m));

    var V_ED_punching_MPa = (1 * ved_net) / (u1 * d * 1000);

    var V_ED_punching_MPa_atTheColumn = (1 * ved_net_under_column) / (u0 * d * 1000);         // maximum punching shear stress at the face of the column 

    var V_ED_punching_kNperM = V_ED_punching_MPa * d * 1000;

    function v_Rd_maxFunction(){

        if(fck == 20000 ) return {v_RD_max : 3.68};

        if(fck == 25000 ) return {v_RD_max : 4.50};

        if(fck == 28000 ) return {v_RD_max : 4.97};

        if(fck == 30000 ) return {v_RD_max : 5.28};

        if(fck == 32000 ) return {v_RD_max : 5.58};

        if(fck == 35000 ) return {v_RD_max : 6.02};

        if(fck == 40000 ) return {v_RD_max : 6.72};

        if(fck == 45000 ) return {v_RD_max : 7.38};

        if(fck == 50000 ) return {v_RD_max : 8.00};

       return{v_RD_max: NaN};

	}
	
    var {v_RD_max} = v_Rd_maxFunction();	
    
    if (V_ED_punching_MPa_atTheColumn <= v_RD_max ){
   
    if (design_span1 >= 2 * d){
        
        function punchingShear_check(){

            if ( V_ED_punching_MPa <= V_RD) return { shear_section2: "Section size is adequate for punching shear!".fontcolor("green"), hint2 :"Safe against punching shear".fontcolor("green")};

            return {shear_section2: "Section size is inadequate for punching shear!".fontcolor("red"), hint2 :"Increase the depth of the pad or the concrete grade".fontcolor("red")};

        }        
        var {shear_section2, hint2} = punchingShear_check();
  
    }else {
        var shear_section2 = "Punching shear critical section is outside the footing zone".fontcolor("brown");

        var hint2 = "Safe against punching shear".fontcolor("brown");
    }

    var shear_section_max = "Safe against punching shear at the face of the column".fontcolor("green");

    var hint_max = "Check the concrete shear resistance at controlled per. (u1)".fontcolor("green");

        
    


   
    }else {

        alert("Punching shear failure! Increase the depth of the foundation or the concrete grade.");

        //location.reload();

        var shear_section_max = "Punching shear failure at the face of the column".fontcolor("red");

        var hint_max = "Increase the depth of the pad or the concrete grade".fontcolor("red")

    }
    document.getElementById("PunchingShear"    ).innerHTML = shear_section2;
        
    document.getElementById("HintPunchingShear").innerHTML = hint2         ;
    
    document.getElementById("PunchingShearMax"    ).innerHTML = shear_section_max;
        
    document.getElementById("HintPunchingShearMax").innerHTML = hint_max         ;

    console.log(V_ED_punching_MPa_atTheColumn);
    document.getElementById("maximumShearAtColumnFace").innerHTML = precision(V_ED_punching_MPa_atTheColumn);

    console.log(V_ED_kNperM);
    document.getElementById("beamShear_perMeter").innerHTML = precision(V_ED_kNperM);

    console.log(V_ED_MPa);
    document.getElementById("beamShear_pressure").innerHTML = precision(V_ED_MPa);
    
    console.log(v_RD_max);
    document.getElementById("concMaxShearResis").innerHTML = precision(v_RD_max);

    console.log(steel_Ratio);
    document.getElementById("steelRatio").innerHTML = precision(steel_Ratio);

    console.log(V_RD);
    document.getElementById("concreteShearResis").innerHTML = precision(V_RD);

    console.log(V_ED_punching_kNperM);
    document.getElementById("punchingShear_perMeter").innerHTML = precision(V_ED_punching_kNperM);

    console.log(V_ED_punching_MPa);
    document.getElementById("punchingShear_pressure").innerHTML = precision(V_ED_punching_MPa);

    console.log(design_span1);

    console.log(d * 2);

}

//------------------------------------------------------------------------------------------------------------------------------------------------	
function pagePrint() {

	window.print();
  }

