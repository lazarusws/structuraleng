
//-------------------------------------------------------------------------------
//function reset 

function blank_output() {
	document.getElementById( "clstrip" ).innerHTML               = "";
	document.getElementById( "mdlstrip").innerHTML               = "";	
	document.getElementById( "sagmom" ).innerHTML                = "";
	document.getElementById( "sagmomcol" ).innerHTML              = "";
	document.getElementById( "sagmommid" ).innerHTML             = "";
	document.getElementById( "hogmom" ).innerHTML                = "";
	document.getElementById( "hogmommid" ).innerHTML             = "";
	document.getElementById( "hogmomcol" ).innerHTML             = "";
	document.getElementById( "ksagclm" ).innerHTML               = "";
	document.getElementById( "ksagmid" ).innerHTML               = "";
	document.getElementById( "khogclm" ).innerHTML               = "";
	document.getElementById( "khogmid" ).innerHTML               = "";
	document.getElementById( "assagclm" ).innerHTML              = "";
	document.getElementById( "assagmid" ).innerHTML              = "";
	document.getElementById( "ashogclm" ).innerHTML              = "";
	document.getElementById( "ashogmid" ).innerHTML              = "";
	document.getElementById( "spacebotclm" ).innerHTML           = "";
	document.getElementById( "spacebotmid" ).innerHTML           = "";
	document.getElementById( "spacetopclm" ).innerHTML           = "";
	document.getElementById( "spacetopmid" ).innerHTML           = "";
	document.getElementById( "designShearStressAtColumnFace" ).innerHTML= "";
	document.getElementById( "concMaxShearResis" ).innerHTML          = "";
	document.getElementById( "designShearStress" ).innerHTML          = "";	
	document.getElementById( "concreteShearResis" ).innerHTML         = "";
	document.getElementById( "punchReinfArea" ).innerHTML             = "";
	document.getElementById( "shearReinfResisWithConcrete" ).innerHTML= "";	
	document.getElementById("perimeterShearReinforcement").innerHTML =  "";
	document.getElementById("radius").innerHTML                      =   "";

	document.getElementById("noStirrup").innerHTML                   =  "" ;



	
	return true;
 }
 
 function reset_page() {
	document.getElementById( "deadLoad"    ).value = 8.0;
	document.getElementById( "liveLoad"    ).value = 4.0;
	document.getElementById( "l1"          ).value = 6.0;
	document.getElementById( "l2"          ).value = 8.0;
	document.getElementById( "adjSpanX"     ).value = 6.0;
	document.getElementById( "adjSpanY"     ).value = 6.0;
	document.getElementById( "slabth"      ).value  =0.3;
	document.getElementById( "cs1"         ).value = 0.4;
	document.getElementById( "cs2"         ).value = 0.4;
	document.getElementById( "sfTypeDeadload").value = 1.35;
	document.getElementById( "sfTypeLiveload").value = 1.5;
	document.getElementById( "coverThic"    ).value = 0.015; 
		
	var selectorSteelGrade = document.getElementById("steelType");   
	selectorSteelGrade.selectedIndex = 2;
	
	var selectorStirrupGrade = document.getElementById("stirrupType");   
	selectorStirrupGrade.selectedIndex = 0;

	var selectorConcreteGrade = document.getElementById("concreteType");
	selectorConcreteGrade.selectedIndex = 1; 
	
	var selectorBarDiameter = document.getElementById("barDiaType");
	selectorBarDiameter.selectedIndex = 5;

	var selectorStirrupSize = document.getElementById("stirrupbarDiaType");
   selectorStirrupSize.selectedIndex = 0;
 
	var selectorcolumnPosit = document.getElementById("columnPosition");
	selectorcolumnPosit.selectedIndex = 2;
  
	blank_output();
 
	return true;
 }

//-------------------------------------------------------------------------
function input(){
	//values input 
	var sfdl = parseFloat( document.getElementById( "sfTypeDeadload" ).value );
	var sfll = parseFloat( document.getElementById( "sfTypeLiveload" ).value );
	var DL = parseFloat( document.getElementById( "deadLoad" ).value );
	var LL = parseFloat( document.getElementById( "liveLoad" ).value );
	var lx = parseFloat( document.getElementById( "l1" ).value );                    // slab span in the X direction
	var ly = parseFloat( document.getElementById( "l2" ).value );                    // slab span in the Y direction
	var l_adj_x = parseFloat( document.getElementById( "adjSpanX" ).value );
	var l_adj_y = parseFloat( document.getElementById( "adjSpanY" ).value );
	var colx = parseFloat( document.getElementById( "cs1" ).value );                 //column size in x direction 
	var coly = parseFloat( document.getElementById( "cs2" ).value );                 //column size in y direction
	var D = parseFloat( document.getElementById( "slabth" ).value );
	var c  = parseFloat( document.getElementById( "coverThic" ).value );
    var B = 1                                                                         //width of the slab stip for analysis                                                                

	//selector input
	var selectorConcreteGrade= document.getElementById("concreteType");
	var fck = selectorConcreteGrade[selectorConcreteGrade.selectedIndex].value;
	
	var selectorSteelGrade = document.getElementById("steelType");
	var fyd = selectorSteelGrade[selectorSteelGrade.selectedIndex].value;

	var	selectorStirrupGrade = document.getElementById("stirrupType");
    var	fywd = selectorStirrupGrade[selectorStirrupGrade.selectedIndex].value;
	
	var selectorBarDiameter = document.getElementById("barDiaType");            //bar diameter  
	var bar_asmm = selectorBarDiameter[selectorBarDiameter.selectedIndex].value;

	var	selectorStirrupSize = document.getElementById("stirrupbarDiaType"); 
    var	stirrup_bar_as_mm = selectorStirrupSize[selectorStirrupSize.selectedIndex].value; 

	var selectorcolumnPosit = document.getElementById("columnPosition");
	var betta = selectorcolumnPosit[selectorcolumnPosit.selectedIndex].value;

	

	return {sfdl, sfll, DL, LL, lx, ly, l_adj_x, l_adj_y, colx, coly, D, B, fck, fyd, bar_asmm, c, betta, fywd , stirrup_bar_as_mm};
}
//-------------------------------------------------------------------
//function_strip, effective span calculation 
function strip_design(){

	var {lx, ly, colx, coly, D} = input();

	var clstrp = Math.min(0.5 * lx, 0.5 * ly);                               //column strip 

	var middlex = lx - clstrp;                                               //middle strip in the x direction

	var middley = ly - clstrp;                                               //middle strip in the y direction 

	var middlestrp = Math.min(middlex,middley);

	var effspanx = lx - colx + D;

	var effspany = ly - coly + D;

	var effspan = Math.max(effspanx, effspany);

	console.log(clstrp); 
	document.getElementById("clstrip").innerHTML = precision(clstrp);
	
	console.log(middlestrp); 
	document.getElementById("mdlstrip").innerHTML = precision(middlestrp);	

	return {clstrp, middlestrp, effspan};
}

function critical_section (){

	var{bar_asmm, D, colx, coly, c} = input();


	var d1 = D - c -  (Math.sqrt((4 * bar_asmm)/ 3.14))/2000;         //effective depth = Slab thickness - slab concrete cover - bar dia/2

	var d2 = D - c -  (Math.sqrt((4 * bar_asmm)/ 3.14))*3/2000;         //effective depth = Slab thickness - slab concrete cover - bar dia - bar dia/2(transversal reinf)

	var d = (d1 + d2) / 2  // effective depth for shear analysis,        d1 and d2	are the effective depths in orthogonal directions

	var u0 = 2 * (colx + coly);                                    // column perimetre 

	var u1 = 2 * (colx + coly) + 2 * 3.14159 * 2 * d;         //basic control perimetre in meter for punching shear analysis

	return 	{d1,d2, d, u1, u0};
}

function loading_and_moment(){

	var {sfdl, sfll, DL, LL, D, B , fck, fyd, bar_asmm , lx, ly} = input();

	var {clstrp, middlestrp, effspan} = strip_design();

	//functions_loads and moments 
	
	var dload = sfdl * DL + sfll * LL;               //Design load

	//functions_moments (sagging and hogging moments) - Moment division to strips
	
	var Ms = (sfdl * DL * 0.09 + sfll * LL * 0.100) * Math.min(lx,ly) *  Math.pow(effspan, 2)
    
	var Mh = dload * 0.106 * Math.min(lx,ly) *  Math.pow(effspan, 2)

	var Msaggcol = 0.5 * Ms/clstrp;              // 50 % Sagging moment is divided in to column and middle strip w

	var Msaggmid = 0.5 * Ms/middlestrp;

	var Mhoggcol = 0.7 * Mh/clstrp;              // 70 % of Hogging moment goes to column strip 

	var Mhoggmid = 0.3 * Mh/middlestrp;

	console.log(Ms); 
	document.getElementById("sagmom").innerHTML = precision(Ms);

	console.log(Msaggcol); 
	document.getElementById("sagmomcol").innerHTML = precision(Msaggcol);

	console.log(Msaggmid); 
	document.getElementById("sagmommid").innerHTML = precision(Msaggmid);

	console.log(Mh); 
	document.getElementById("hogmom").innerHTML = precision(Mh);

	console.log(Mhoggcol); 
	document.getElementById("hogmomcol").innerHTML = precision(Mhoggcol);

	console.log(Mhoggmid); 
	document.getElementById("hogmommid").innerHTML = precision(Mhoggmid);


	return {dload, Ms, Msaggcol, Msaggmid, Mh, Mhoggcol, Mhoggmid};
}
function under_reinforcement_check() {

	var { B, fck} = input();

	var {d1} = critical_section();

	var {Msaggcol, Msaggmid, Mhoggcol, Mhoggmid} = loading_and_moment();

	var k_prime = 0.6 * 0.85 - 0.18 * 0.85 * 0.85 - 0.21;               // ductility bis insured by 15% moment distribution of moments 

	var ksagc = (Msaggcol/( B * fck * Math.pow(d1,2)));                  //Change D in to effective depth 

	if (ksagc >= k_prime) {       

        //confirm("Brittle failure!, increase the section capacity by either increasing the depth or the concrete grade.");

        alert("Brittle failure!, increase the section capacity by either increasing the depth or the concrete grade.");

        location.reload();
       
	}else { ksagc = (Msaggcol/( B * fck * Math.pow(d1,2)));
	
	}	

	var ksagm = Msaggmid/( B * fck * Math.pow(d1,2));

	if (ksagm >= k_prime) {       

        //confirm("Brittle failure!, increase the section capacity by either increasing the depth or the concrete grade.");

        alert("Brittle failure!, increase the section capacity by either increasing the depth or the concrete grade.");

        location.reload();
       
	}else { ksagm = Msaggmid/( B * fck * Math.pow(d1,2));
	
	}

	var khogc = Mhoggcol/( B * fck * Math.pow(d1,2));                  //Change D in to effective depth 

	if (khogc >= k_prime ) {       

        //confirm("Brittle failure!, increase the section capacity by either increasing the depth or the concrete grade.");

        alert("Brittle failure!, increase the section capacity by either increasing the depth or the concrete grade.");

        location.reload();
       
	}else { khogc = Mhoggcol/( B * fck * Math.pow(d1,2))
	
	}
	
	var khogm = Mhoggmid/( B * fck * Math.pow(d1,2));    

    if (khogm >= k_prime ) {       

        //confirm("Brittle failure!, increase the section capacity by either increasing the depth or the concrete grade.");

        alert("Brittle failure!, increase the section capacity by either increasing the depth or the concrete grade.");

        location.reload();
       
	}else { khogm = Mhoggmid/( B * fck * Math.pow(d1,2));
	
	}
    
    return{ksagc,ksagm, khogc, khogm};
}

function flexure_design(){	

	var {D, B ,fyd, bar_asmm} = input();	

	var {d1} = critical_section();

	var {ksagc,ksagm, khogc, khogm} = under_reinforcement_check();

	var {Msaggcol, Msaggmid, Mhoggcol, Mhoggmid} = loading_and_moment();

	

	//function_analysis_sagging

	var zsagc = Math.min(((d1/2) * (1 + Math.sqrt(1-3.53 * ksagc))), 0.95 * d1);                  //Change D in to effective depth

	var zsagm = Math.min(((d1/2) * (1 + Math.sqrt(1-3.53 * ksagm))), 0.95 * d1);

	var Assc_mm = Msaggcol * 1000000/(zsagc * fyd);           //Area in square mm 

	var Assm_mm = Msaggmid * 1000000/(zsagm * fyd);

	var sp_mm_sagc = Math.min(((B * 1000 ) / (Assc_mm / bar_asmm)), 2 * D * 1000, 250)  ;       // spacing in mm the least from 2h, 250

	var sp_mm_sagm = Math.min((( B * 1000 ) / (Assm_mm / bar_asmm)), 3 * D * 1000, 400) ;        // spacing in mm the least from 3h, 400


    //function_analysis_hogging

	
	var zhogc = Math.min(((d1/2) * (1 + Math.sqrt(1-3.53 * khogc))),0.95 * d1) ;                  //Change D in to effective depth

	var zhogm = Math.min(((d1/2) * (1 + Math.sqrt(1-3.53 * khogm))),0.95 * d1);

	var Ashc_mm = Mhoggcol * 1000000/(zhogc * fyd);           //Area in square mm 

	var Ashm_mm = Mhoggmid * 1000000/(zhogm * fyd);

	var sp_mm_hogc = Math.min(((B * 1000) / (Ashc_mm / bar_asmm)), 2 * D * 1000, 250);

	var sp_mm_hogm = Math.min(((B * 1000) / (Ashm_mm / bar_asmm)) , 3 * D * 1000, 400);

	//-------------------------------------------------------------------------	
	

	//output---------------------------------------------------------------
	
	//console.log(dload); 
	//document.getElementById("dsl").innerHTML = precision(dload);
	

	

	console.log(ksagc); 
	document.getElementById("ksagclm").innerHTML = precision(ksagc);

	console.log(ksagm); 
	document.getElementById("ksagmid").innerHTML = precision(ksagm);

	/*console.log(zsagc); 
	document.getElementById("zsagclm").innerHTML = precision(zsagc);

	console.log(zsagm); 
	document.getElementById("zsagmid").innerHTML = precision(zsagm);*/



	console.log(khogc); 
	document.getElementById("khogclm").innerHTML = precision(khogc);

	console.log(khogm); 
	document.getElementById("khogmid").innerHTML = precision(khogm);

	/*console.log(zhogc); 
	document.getElementById("zhogclm").innerHTML = precision(zhogc);

	console.log(zhogm); 
	document.getElementById("zhogmid").innerHTML = precision(zhogm);*/

	
	console.log(Assc_mm); 
	document.getElementById("assagclm").innerHTML = precision(Assc_mm);

	console.log(Assm_mm); 
	document.getElementById("assagmid").innerHTML = precision(Assm_mm);

	console.log(Ashc_mm); 
	document.getElementById("ashogclm").innerHTML = precision(Ashc_mm);

	console.log(Ashm_mm); 
	document.getElementById("ashogmid").innerHTML = precision(Ashm_mm);


	console.log(sp_mm_sagc); 
	document.getElementById("spacebotclm").innerHTML = Math.floor(sp_mm_sagc);

	console.log(sp_mm_sagm); 
	document.getElementById("spacebotmid").innerHTML = Math.floor(sp_mm_sagm);

	console.log(sp_mm_hogc); 
	document.getElementById("spacetopclm").innerHTML = Math.floor(sp_mm_hogc);

	console.log(sp_mm_hogm); 
	document.getElementById("spacetopmid").innerHTML = Math.floor(sp_mm_hogm);

	return{Ashc_mm};

}

// reaction force at the column 

function reaction_force() {

	var {l_adj_x,l_adj_y, lx,ly, betta,colx, coly} = input();

	var {dload} = loading_and_moment();

	var {d} = critical_section();

	//punching shear area 

	var punch_area = (colx * coly) + (4 * coly * d) + (4 * colx * d) + (4 * Math.PI * d * d)

	if ( betta == 1.15){                       //Internal column reaction force

		var V_ED_kN = dload * ((lx/2 + l_adj_x/2)*(ly/2 + l_adj_y/2) - punch_area);

	} else if (betta == 1.4){

	var V_ED_kN = dload * ((lx/2 )*(ly/2 + l_adj_y/2) - punch_area);

	}else {                                         //corner column 

		var V_ED_kN = dload * ((lx/2 )*(ly/2) - punch_area);
	}

	return {V_ED_kN};

}
//Punching shear design ------------------------------------------------------
function shear_design(){

	var {fck, fyd, betta, colx, coly, fywd, stirrup_bar_as_mm} = input(); 

	var {d,d1,d2, u1 , u0} = critical_section();

	var {Ashc_mm} = flexure_design();

	var {clstrp} = strip_design();	

	var {V_ED_kN} = reaction_force();	

	var St = 350;

	var v_ED_MPa = betta * V_ED_kN / (u1 * d * 1000); //design shear stress	at controlled perimeter
	
	var v_ED_MPa_columnFace = betta * V_ED_kN / (u0 * d * 1000 ); //design shear stress	at face of column

	function v_Rd_maxFunction(){

        if(fck == 20000 ) return {v_RD_max : 3.31};

        if(fck == 25000 ) return {v_RD_max : 4.05};

        if(fck == 28000 ) return {v_RD_max : 4.48};

        if(fck == 30000 ) return {v_RD_max : 4.75};

        if(fck == 32000 ) return {v_RD_max : 5.02};

        if(fck == 35000 ) return {v_RD_max : 5.42};

        if(fck == 40000 ) return {v_RD_max : 6.05};

        if(fck == 45000 ) return {v_RD_max : 6.64};

        if(fck == 50000 ) return {v_RD_max : 7.20};

       return{v_RD_max: NaN};

	}
	
	var {v_RD_max} = v_Rd_maxFunction();	

	if (v_ED_MPa_columnFace <= v_RD_max ){

		//shear capacity without shear reinforcement (v_Rd_c);

		var steel_Ratio1 = ((Ashc_mm / 1000000)/ (clstrp * d1));    // steel ratio in percent

		var steel_Ratio2 = ((Ashc_mm / 1000000)/ (clstrp * d2)); 

		var steel_Ratio = Math.sqrt(steel_Ratio1 * steel_Ratio2);

		var ratio_for_Vrd = Math.min(steel_Ratio , 0.02); 

		var kk = Math.min((1 + Math.sqrt(0.2 / d)),2.0); 

		var v_RD_MPa = 0.12 * kk * Math.cbrt( 100 *  ratio_for_Vrd * fck / 1000);    //shear capacity of the concrete in MPa

		var v_RD_MPa_min = 0.035 * Math.pow( kk, 1.5) * Math.sqrt(fck / 1000);

		var v_RD_c = Math.max(v_RD_MPa,v_RD_MPa_min);

		if(v_ED_MPa > v_RD_c ) {

			var fywd_ef = Math.min((250 + 0.25 * d * 1000), (fywd/1000)); 

			var Sr = 0.75 * d * 1000;

			var Asw_mm = (v_ED_MPa - 0.75 * v_RD_c) * Sr * u1 * 1000/ (1.5 * fywd_ef);

			var Asw_min_mm = (0.053 * Sr * St * Math.sqrt(fck/1000))/(fyd * 1.15/1000);

			var Asw_req_area_mm = Math.round(precision(Math.max(Asw_mm,Asw_min_mm)) /10) *10;

			var n = Math.ceil(Asw_req_area_mm/stirrup_bar_as_mm);

			var Asw_provided_area_mm = n * stirrup_bar_as_mm;

			var V_Rd_withPunchingReinf = 0.75 * v_RD_c + 1.5 * (d / Sr) * Asw_provided_area_mm * fywd_ef * (1 /(u1 * d)) * 1.0 * 0.001;  //1.0 is sin alpha which is 1.0 for vertical reinforcement and multiplied by 0.001 to make units the same

			var outer_perimeter_m = betta * V_ED_kN / (v_RD_c * d * 1000);

			var oter_radius = (outer_perimeter_m - 2 *(colx+coly))/(2*Math.PI);

			var radius = oter_radius - 1.5 * d 
		}else {

			var Asw_req_area_mm = "Not required."

		}

	}else {

        alert("Punching shear failure! Increase the depth of the slab or the concrete grade");

        location.reload();

	}

	console.log(v_ED_MPa_columnFace);
	document.getElementById("designShearStressAtColumnFace").innerHTML = precision(v_ED_MPa_columnFace);

	console.log(v_RD_max);
	document.getElementById("concMaxShearResis").innerHTML = precision(v_RD_max);
	
	console.log(v_ED_MPa);
	document.getElementById("designShearStress").innerHTML = precision(v_ED_MPa);	

	console.log(v_RD_c);
	document.getElementById("concreteShearResis").innerHTML = precision(v_RD_c);

	console.log(Asw_req_area_mm)
	document.getElementById("punchReinfArea").innerHTML = Asw_req_area_mm;

	console.log(n)
	document.getElementById("noStirrup").innerHTML = n;

	console.log(V_Rd_withPunchingReinf)
	document.getElementById("shearReinfResisWithConcrete").innerHTML = precision(V_Rd_withPunchingReinf);

	console.log(outer_perimeter_m)
	document.getElementById("perimeterShearReinforcement").innerHTML = precision(outer_perimeter_m);

	console.log(radius)
	document.getElementById("radius").innerHTML = precision(radius);

	
	

	console.log(fywd_ef);
	

	console.log(Sr);
	console.log(d);
	console.log(kk);
	console.log(Asw_mm);
	console.log(v_RD_MPa_min);

	console.log(Asw_min_mm)
	console.log(V_ED_kN);

	console.log(steel_Ratio1);

	console.log(steel_Ratio2);
	console.log(steel_Ratio);

	
	

	

	

	

//----------------------------------------------------------------------------------

	
}

//Button app for flexure design 

function checkboxfunction ()
	/*
{
	var checkBox = document.getElementById("myCheck");

	var text = document.getElementById("text");

	if (checkBox.checked == true){

	  //text.style.display = "block";


	} else {

   text.style.display = "none";

	}*/

{
	
	var checker = document.getElementById("myCheck");
 
	var designbtn = document.getElementById("text");
 
	// when unchecked or checked, run the function
 
	checker.onchange = function(){

		if(this.checked){
	
			designbtn.disabled = false;

		} else {
	
			designbtn.disabled = true;

		}

}
}
//-------------------------------------------------------------------------		
function pagePrint() {

	window.print();
  }