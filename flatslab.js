//-------------------------------------------------------------------------
var DL;                                  //Dead load
var LL;                                  //Live load
var dload;                               //Design load
var sfdl;                                //safety factor for dead load
var sfll;                                //safety factor for live load
var clstrp                               //column strip 
var lx                                   // slab span in the X direction
var ly                                   // slab span in the Y direction
var D                                    //Depth
var d                                    //effective depth 
var B
var colx                                 //column size in x direction 
var coly                                 //column size in y direction
var effspanx                              //effective span in in direction 
var effspany                              //effective span in y direction 
var effspan                               //effective span
var Ms
var Mh                                    //Hogging moment 
var middlex                              //middle strip in the x direction
var middley                              //middle strip in the y direction 
var selectordeadload;                    //Safety factor selector for dead load
var selectorliveload;                    //Safety factor selector for live load
var selectorconc
var selectorsteel;
var selectordia
var Msaggcol;
var Msaggmid;
var Mhoggcol;
var Mhoggmid;
var ksagc;
var ksagm;
var zsagc;
var zsagm;
var khogc;
var khogm
var zhogc
var zhogm;
var fck;
var fyd;
var Assc_mm 
var Assm_mm
var Ashc_mm
var Ashm_mm
var bar_asmm
var sp_mm_sagc
var sp_mm_sagm
var sp_mm_hogc
var sp_mm_hogm

//-------------------------------------------------------------------------

function designcalculation()

{
	selectordeadload = document.getElementById("sftypedl");
	sfdl = selectordeadload[selectordeadload.selectedIndex].value;

	selectorliveload = document.getElementById("sftypell");
	sfll = selectorliveload[selectorliveload.selectedIndex].value;

	selectorconc = document.getElementById("ctype");
	fck = selectorconc[selectorconc.selectedIndex].value;
	
	selectorsteel = document.getElementById("stype");
	fyd = selectorsteel[selectorsteel.selectedIndex].value;
	
	selectordia = document.getElementById("dtype");            //bar diameter  
	bar_asmm = selectordia[selectordia.selectedIndex].value;

	DL = parseFloat( document.getElementById( "dl" ).value );
	LL = parseFloat( document.getElementById( "ll" ).value );
	lx = parseFloat( document.getElementById( "l1" ).value );
	ly = parseFloat( document.getElementById( "l2" ).value );
	colx = parseFloat( document.getElementById( "cs1" ).value );
	coly = parseFloat( document.getElementById( "cs2" ).value );
	D = parseFloat( document.getElementById( "slabth" ).value );
    B = 1                                                           //width of the slab stip for analysis                                                                

	d = D - 0.025 - (Math.sqrt((4 * bar_asmm)/ 3.14))/1000;         //effective depth = Slab thickness - slab concrete cover - bar dia

	//-------------------------------------------------------------------------
	//function_strip, effective span calculation 
	
	clstrp = Math.min(0.5 * lx, 0.5 * ly);
	middlex = lx - clstrp;
	middley = ly - clstrp;
	effspanx = lx - 2 * (2/3) * colx;
	effspany = ly - 2 * (2/3) * coly;
	effspan = Math.max(effspanx, effspany)


	//-------------------------------------------------------------------------
	//functions_loads and moments 
	
	dload = sfdl * DL + sfll * LL;

	//-------------------------------------------------------------------------		
	//functions_moments (sagging and hogging moments) - Moment division to strips
	
	Ms = (sfdl * DL * 0.09 + sfll * LL * 0.100) * Math.min(lx,ly) *  Math.pow(effspan, 2)
    
	Mh = dload * 0.106 * Math.min(lx,ly) *  Math.pow(effspan, 2)

	Msaggcol = 0.5 * Ms/clstrp              // 50 % Sagging moment is divided in to column and middle strip w

	Msaggmid = 0.5 * Ms/clstrp

	Mhoggcol = 0.7 * Mh/clstrp              // 70 % of Hogging moment goes to column strip 

	Mhoggmid = 0.3 * Mh/clstrp

    //-------------------------------------------------------------------------		
	//function_analysis_sagging
	//column and middle_strip                                    //Moment division is 50 %, values for column and middle strip is equal.

	ksagc = Msaggcol/( B * fck * Math.pow(d,2));                  //Change D in to effective depth 

	ksagm = Msaggmid/( B * fck * Math.pow(d,2));

	zsagc = (d/2) * (1 + Math.sqrt(1-3.53 * ksagc));                  //Change D in to effective depth

	zsagm = (d/2) * (1 + Math.sqrt(1-3.53 * ksagm));

	Assc_mm = Msaggcol * 1000000/(zsagc * fyd);           //Area in square mm 

	Assm_mm = Msaggmid * 1000000/(zsagm * fyd);

	sp_mm_sagc = Math.min(((B * 1000 ) / (Assc_mm / bar_asmm)), 2 * D * 1000)  ;       // saping in mm

	sp_mm_sagm = Math.min((( B * 1000 ) / (Assm_mm / bar_asmm)), 2 * D * 1000) ;

    //function_analysis_hogging

	khogc = Mhoggcol/( B * fck * Math.pow(d,2));                  //Change D in to effective depth 

	khogm = Mhoggmid/( B * fck * Math.pow(d,2));

	zhogc = (d/2) * (1 + Math.sqrt(1-3.53 * khogc));                  //Change D in to effective depth

	zhogm = (d/2) * (1 + Math.sqrt(1-3.53 * khogm));

	Ashc_mm = Mhoggcol * 1000000/(zhogc * fyd);           //Area in square mm 

	Ashm_mm = Mhoggmid * 1000000/(zhogm * fyd);

	sp_mm_hogc = Math.min(((B * 1000) / (Ashc_mm / bar_asmm)), 2 * D * 1000);

	sp_mm_hogm = Math.min(((B * 1000) / (Ashm_mm / bar_asmm)) , 2 * D * 1000);

	//-------------------------------------------------------------------------	
	

	//output---------------------------------------------------------------
	
	console.log(dload); 
	document.getElementById("dsl").innerHTML = precision(dload);

	console.log(clstrp); 
	document.getElementById("clstrip").innerHTML = precision(clstrp);
	
	console.log(middlex); 
	document.getElementById("mdlstripx").innerHTML = precision(middlex);
	
	console.log(middley); 
	document.getElementById("mdlstripy").innerHTML = precision(middley);

	console.log(Mh); 
	document.getElementById("hogmom").innerHTML = precision(Mh);

	console.log(Ms); 
	document.getElementById("sagmom").innerHTML = precision(Ms);

	console.log(Msaggcol); 
	document.getElementById("sagmomcol").innerHTML = precision(Msaggcol);

	console.log(Msaggmid); 
	document.getElementById("sagmommid").innerHTML = precision(Msaggmid);

	console.log(Mhoggcol); 
	document.getElementById("hogmomcol").innerHTML = precision(Mhoggcol);

	console.log(Mhoggmid); 
	document.getElementById("hogmommid").innerHTML = precision(Mhoggmid);


	console.log(ksagc); 
	document.getElementById("ksagclm").innerHTML = precision(ksagc);

	console.log(ksagm); 
	document.getElementById("ksagmid").innerHTML = precision(ksagm);

	console.log(zsagc); 
	document.getElementById("zsagclm").innerHTML = precision(zsagc);

	console.log(zsagm); 
	document.getElementById("zsagmid").innerHTML = precision(zsagm);



	console.log(khogc); 
	document.getElementById("khogclm").innerHTML = precision(khogc);

	console.log(khogm); 
	document.getElementById("khogmid").innerHTML = precision(khogm);

	console.log(zhogc); 
	document.getElementById("zhogclm").innerHTML = precision(zhogc);

	console.log(zhogm); 
	document.getElementById("zhogmid").innerHTML = precision(zhogm);

	
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

	

}


//Button app for flexure design 

function checkboxfunction ()
	
{
	var checkBox = document.getElementById("myCheck");
	var text = document.getElementById("text");
	if (checkBox.checked == true){
	  text.style.display = "block";
	} else {
   text.style.display = "none";
	}
}
//-------------------------------------------------------------------------		