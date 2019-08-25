//---------------------------------------------------------------------
function blank_output(){
   document.getElementById( "clsWeb"      ).innerHTML      = "";
   document.getElementById( "clsFlange"   ).innerHTML      = "";
   document.getElementById( "flangeWidth" ).innerHTML      = "";
   document.getElementById( "depth"       ).innerHTML      = "";
   document.getElementById( "heightWeb"   ).innerHTML      = "";
   document.getElementById( "thicWeb"     ).innerHTML      = "";
   document.getElementById( "thicFlange"  ).innerHTML      = "";
   document.getElementById( "rad"         ).innerHTML      = "";
   document.getElementById( "steelsec"    ).innerHTML      = "";
   document.getElementById( "radGyr_x"    ).innerHTML      = "";
   document.getElementById( "radGyr_y"    ).innerHTML      = "";
   document.getElementById( "slendCoffiX" ).innerHTML      = "";
   document.getElementById( "slendCoffiY" ).innerHTML      = "";
   document.getElementById( "phi"         ).innerHTML      = "";
   document.getElementById( "redFactor"   ).innerHTML      = "";
   document.getElementById( "plasresist"  ).innerHTML      = "";
   document.getElementById( "buckresist"  ).innerHTML      = "";
   document.getElementById("serialSize"   ).innerHTML      = "";


   return true;
}

// ---------------------------------------------------------------------

function reset_page() 
{
   document.getElementById( "digits"    ).value = 6     ;
   document.getElementById( "dLoad"     ).value = 400.00;
   document.getElementById( "lx"        ).value = 2.5   ;
   document.getElementById( "ly"        ).value = 2.5   ;
   document.getElementById( "elasMod"   ).value = 210   ;

   var selectorMaterialSF = document.getElementById("materialSfType");
   
   selectorMaterialSF.selectedIndex = 0;

   var selectorSteel = document.getElementById("steelType");
   
   selectorSteel.selectedIndex = 2;

   var selectorEffectiveLengthCoeff = document.getElementById("connectionType");

    selectorEffectiveLengthCoeff.selectedIndex = 0;
 
   blank_output();

   return true;
}
//-------------------------------------------------------------------------------------------------
function input(){

    // Value input

    var designLoad = parseFloat( document.getElementById( "dLoad" ).value);         //Input load in kN

    var E  = parseFloat( document.getElementById( "elasMod" ).value );

    var Lex  = parseFloat( document.getElementById( "lx" ).value );

    var Ley  = parseFloat( document.getElementById( "ly" ).value );

    //Input from selector 

    var selectorSteel = document.getElementById("steelType");

    var fs = selectorSteel[selectorSteel.selectedIndex].value;

    var selectorMaterialSF = document.getElementById("materialSfType");

    var safetySteel = selectorMaterialSF[selectorMaterialSF.selectedIndex].value;

    var selectorEffectiveLengthCoeff = document.getElementById("connectionType");

    var K = selectorEffectiveLengthCoeff[selectorEffectiveLengthCoeff.selectedIndex].value;

    return {designLoad, E, Lex, Ley, fs, safetySteel, K};

}
// ----------------------------------------------------------------------------------

//-----------------------------------------------------------------------------------
function designSection(){

    var {E, Lex, Ley, designLoad, fs, safetySteel, K} = input();

    var fyd = fs / safetySteel;                             //design material yield strength (Factored by safety factor);

    var As_cm = designLoad * 10000 / fyd;                   //Required steel area in mmSq 

    //Input check 

    if ( E > 0.0){}   else{alert( "Invalid elastic modulus input !")};
	if ( designLoad > 0.0){}   else{alert( "Invalid design load input !")};
	if ( Lex > 0.0){}else{alert( "Invalid column height in the x axis input !")};
	if ( Ley > 0.0){}else{alert( "Invalid column height in the y axis input !")};
	
    do {
        
        function steelSection() {  

            if (As_cm <= 29.2) return {serial_size: "152x152x23", asec_cm: 29.2, D: 152.4, d: 123.6, B: 152.2, tw: 5.8, tf: 6.8, r: 7.6, ix: 6.54, iy: 3.7};
        
            if (As_cm <= 38.3) return {serial_size: "152x152x30", asec_cm: 38.3, D: 157.6, d: 123.6, B: 152.9, tw: 6.5, tf: 9.4, r: 7.6, ix: 6.76, iy:3.83};
        
            if (As_cm <= 47.1) return {serial_size: "152x152x37", asec_cm: 47.1, D: 161.8, d: 123.6, B: 154.4, tw: 8  , tf: 11.5, r: 7.6, ix: 6.85, iy: 3.87};
        
            if (As_cm <= 56.1) return {serial_size: "152x152x44", asec_cm: 56.1, D: 166,   d: 123.6, B: 155.9, tw:9.5 , tf: 13.6, r: 7.6, ix: 6.94, iy: 3.92};
          
            if (As_cm <= 58.7) return {serial_size: "203x203x46", asec_cm: 58.7, D: 203.2,   d: 160.8, B: 203.2, tw:7.2 , tf: 11,  r: 10.2, ix: 8.82, iy: 5.13};
        
            if (As_cm <= 65.2) return {serial_size: "152x152x51", asec_cm: 65.2, D: 170.2,   d: 123.6, B: 157.4, tw:11 , tf: 15.7, r: 7.6, ix: 7.04, iy:3.96};
        
            if (As_cm <= 66.3) return {serial_size: "203x203x52", asec_cm: 66.3, D: 206.2,   d: 160.8, B: 204.3, tw:7.9 , tf: 12.5,  r: 10.2, ix: 8.91, iy: 5.18};
        
            if (As_cm <= 76.4) return {serial_size: "203x203x60", asec_cm: 76.4, D: 209.6,   d: 160.8, B: 205.8, tw:9.4 , tf: 14.2,  r: 10.2, ix: 8.96, iy: 5.2};
        
            if (As_cm <= 90.4) return {serial_size: "203x203x71", asec_cm: 90.4, D: 215.8,   d: 160.8, B: 206.4, tw:10 , tf: 17.3,  r: 10.2, ix: 9.18, iy: 5.3};
        
            if (As_cm <= 93.1) return {serial_size: "254x254x73", asec_cm: 93.1, D: 254.1,  d: 200.3, B: 254.6, tw:8.6, tf: 14.2,  r: 12.7, ix: 11.1, iy: 6.48};
        
            if (As_cm <= 110) return {serial_size: "203x203x86", asec_cm: 110, D: 222.2,   d: 160.8, B: 209.1, tw:12.7 , tf: 20.5,  r: 10.2, ix: 9.28, iy: 5.34};
        
            if (As_cm <= 113)  return {serial_size: "254x254x89", asec_cm: 113,  D: 260.3,  d: 203.3, B: 256.3, tw:10.3 , tf: 17.3,  r: 12.7, ix: 11.2, iy: 6.55};
        
            if (As_cm <= 123)  return {serial_size: "305x305x97", asec_cm: 123,  D: 307.9,  d: 246.7, B: 305.3, tw:9.9  , tf: 15.4,  r: 15.2, ix: 13.4, iy: 7.69};
        
            if (As_cm <= 127) return {serial_size: "203x203x100", asec_cm: 127, D: 228.6,   d: 160.8, B: 210.3, tw:14.5 , tf: 23.7,  r: 10.2, ix: 9.44, iy: 5.39};
        
            if (As_cm <= 136)  return {serial_size: "254x254x107", asec_cm: 136,  D: 266.7,  d: 203.3, B: 258.8, tw:12.8 , tf: 20.5,  r: 12.7, ix: 11.3, iy: 6.59};
        
            if (As_cm <= 145) return {serial_size: "203x203x113", asec_cm: 145, D: 235,   d: 160.8, B: 212.1, tw:16.3 , tf: 26.9,  r: 10.2, ix: 9.59, iy: 5.45};
            
            if (As_cm <= 150)  return {serial_size: "305x305x118", asec_cm: 150,  D: 314.5,  d: 246.7, B: 307.4, tw:12   , tf: 18.7,  r: 15.2, ix: 13.6, iy: 7.77};
        
            if (As_cm <= 162) return {serial_size: "203x203x127", asec_cm: 162, D: 241.4,  d: 160.8, B: 213.9, tw:18.1 , tf: 30.1,  r: 10.2, ix: 9.75, iy: 5.5};  
            
            if (As_cm <= 164)  return {serial_size: "356x368x129", asec_cm: 164,  D: 355.6,  d: 290.2, B: 368.6, tw:10.4,  tf: 17.5,  r: 15.2, ix: 15.6, iy: 9.43};
        
            if (As_cm <= 168)  return {serial_size: "254x254x132", asec_cm: 168,  D: 276.3,  d: 203.3, B: 261.3, tw:15.3, tf: 25.3,  r: 12.7, ix: 11.6, iy: 6.69};
        
            if (As_cm <= 174)  return {serial_size: "305x305x137", asec_cm: 174,  D: 320.5,  d: 246.7, B: 309.2, tw:13.8,  tf: 21.7,  r: 15.2, ix: 13.7, iy: 7.83};
        
            if (As_cm <= 195)  return {serial_size: "356x368x153", asec_cm: 195,  D: 362,  d: 290.2,   B: 370.5, tw:12.3,  tf: 20.7,  r: 15.2, ix: 15.8, iy: 9.49};
        
            if (As_cm <= 201)  return {serial_size: "305x305x158", asec_cm: 201,  D: 327.1,  d: 246.7, B: 311.2, tw:15.8,  tf: 25  ,  r: 15.2, ix: 13.9, iy: 7.9};
        
            if (As_cm <= 213)  return {serial_size: "254x254x167", asec_cm: 213,  D: 289.1,  d: 203.3, B: 265.2, tw:19.2 , tf: 31.7,  r: 12.7, ix: 11.9, iy: 6.81};
        
            if (As_cm <= 226)  return {serial_size: "356x368x177", asec_cm: 226,  D: 368.2,  d: 290.2, B: 372.6, tw:14.4,  tf: 23.8,  r: 15.2, ix: 15.9, iy: 9.54};
            
            if (As_cm <= 252)  return {serial_size: "305x305x198", asec_cm: 252,  D: 339.9,  d: 246.7, B: 314.5, tw:19.1,  tf: 31.4,  r: 15.2, ix: 14.2, iy: 8.04};
           
            if (As_cm <= 257)  return {serial_size: "356x368x202", asec_cm: 257,  D: 374.6,  d: 290.2, B: 374.7, tw:16.5,  tf: 27 ,  r: 15.2, ix: 16.1, iy: 9.6};
        
            if (As_cm <= 299)  return {serial_size: "356x406x235", asec_cm: 299,  D: 381 ,  d: 290.2, B: 394.8, tw:18.4,  tf: 30.2,  r: 15.2, ix: 16.3, iy: 10.2};
        
            if (As_cm <= 306)  return {serial_size: "305x305x240", asec_cm: 306,  D: 352.5,  d: 246.7, B: 318.4, tw:23  ,  tf: 37.7,  r: 15.2, ix: 14.5, iy: 8.15};
        
            if (As_cm <= 360)  return {serial_size: "305x305x283", asec_cm: 360,  D: 365.3,  d: 246.7, B: 322.2, tw:26.8,  tf: 44.1,  r: 15.2, ix: 14.8, iy: 8.27};
        
            if (As_cm <= 366)  return {serial_size: "356x406x287", asec_cm: 366,  D: 393.6,  d: 290.2, B: 399, tw:22.6 ,  tf: 36.5,  r: 15.2, ix: 16.5, iy: 10.3};
        
            if (As_cm <= 433)  return {serial_size: "356x406x340", asec_cm: 433,  D: 406.4,  d: 290.2, B: 403, tw:26.6 ,  tf: 42.9,  r: 15.2, ix: 16.8, iy: 10.4};
        
            if (As_cm <= 501)  return {serial_size: "356x406x393", asec_cm: 501,  D: 419  ,  d: 290.2, B: 407  , tw:30.6,  tf: 49.2,  r: 15.2, ix: 17.1, iy: 10.5};
        
            if (As_cm <= 595)  return {serial_size: "356x406x467", asec_cm: 595,  D: 436.6,  d: 290.2, B: 412.2, tw:35.8,  tf: 58  ,  r: 15.2, ix: 17.5, iy: 10.7};
        
            if (As_cm <= 702)  return {serial_size: "356x406x551", asec_cm: 702,  D: 455.6,  d: 290.2, B: 418.5, tw:42.1,  tf: 67.5 ,  r: 15.2, ix: 18, iy: 10.9};
        
            if (As_cm <= 808)  return {serial_size: "356x406x634", asec_cm: 808,  D: 474.6,  d: 290.2, B: 424  , tw:47.6,  tf: 77  ,  r: 15.2, ix: 18.4, iy: 11};
        
            return {serial_size:NaN, asec_cm: NaN,  D: NaN,  d: NaN, B: NaN , tw:NaN,  tf: NaN  ,  r: NaN, ix: NaN, iy: NaN};
        
        }
       
        var { serial_size, D, B, tw, tf, r , d, asec_cm , ix, iy} = steelSection();

        //Design steel grade--------------------------------------------------------------
        //--------------------------------------------------------------------------------
            //Design section ----------------------------------------------------------
        
            var t = Math.max(tf, tw);
        
            if (fs == 235000){
        
                var fy = fyd;
        
            }else if (fs == 275000){
                
                if (t <= 16){
        
                    var fy = fyd;  
        
                }else if (t <= 40){
        
                    var fy = fyd - 10;  
        
                }else if (t <= 63){
            
                    var fy = fyd - 20;  
        
                }else {
            
                    var fy = fyd - 30;  
        
                }

            }else if (fs == 355000){
            
                if (t <= 16){
        
                    var fy = fyd;  
        
           
                }else if (t <= 40){
        
                
                    var fy = fyd - 10;  
        
            
                }else if (t <= 63){
        
                
                    var fy = fyd - 20;  
        
            
                }else{
        
                var fy = fyd - 30; 
                } 

            }else if (fs == 420000){
        
                var fy = fyd;
        
            }else if (fs == 460000){
        
                var fy = fyd;
            }
    
        //epsilon factor----------------------------------------------------------------
        
        var epes = Math.sqrt(235 *1000 / fy);

        //class web section-----------------------------------------------------------

        var cf_tw = (B - tw - 2 * r) / ( 2 * tw);

    
        if (cf_tw< 72 * epes){
        
        
            var c_w = 1;

        
            var A_steel_web_section = asec_cm;

        }else if (cf_tw< 83 * epes){ 
        
            var c_w = 2; 

            var A_steel_web_section = asec_cm;

        }else if (cf_tw< 124 *epes){
        
            var c_w = 3; 

            var A_steel_web_section = asec_cm;
    
        }else {
        
            var c_w = 4
    
            var A_steel_web_section = asec_cm * 0.8;
    
        }
        //class flange section----------------------------------------------------------------------

        var cf_tf = (D - 2 * tf - 2 * r ) / (tf);

        if (cf_tf< 9  * epes){
 
            c_f = 1;
 
            var A_steel_flange_section = asec_cm;
    
        }else if (cf_tf< 10* epes){          
         
            var c_f = 2 ;         
         
            var A_steel_flange_section = asec_cm;   
     
        }else if (cf_tf< 14 * epes){          
        
            var c_f = 3;     
        
            var A_steel_flange_section = asec_cm;

        }else{
         
            var c_f = 4;
     
         
            var A_steel_flange_section = asec_cm * 0.8;
     
        }
        //Design area section (Area or Effective area)

        var design_section_area = Math.min(A_steel_flange_section,A_steel_web_section);
       
        //---------------------------------------------------------------------------------
        //Section capacity (Compression resistance)

        //Plastic resistance

        var Ncrd_kN = design_section_area * fy * 0.0001;                     //    Diveded by 10000 to change the unit in square metric
 
        //----------------------------------------------------------------------------------

        //Determine slenderness and reduction factor

        var lam_1 = 3.14 * Math.sqrt(E * 1000000/fy)

        var lam_x = Lex * K * 100/ ix;                                   //Radius of gyration unit chnaged from cm to m

        var lam_y = Ley * K * 100/ iy;

        var lam_x_bar = lam_x / lam_1;

        var lam_y_bar = lam_y / lam_1;
     //------------------------------------------------------------------------------------
     //Buckling curve
        
        if (D/B > 1.2){

            if (tf <= 40){

                var x_x = 0.21;

                var y_y = 0.34;

            }else{

                var x_x = 0.34;

                var y_y = 0.49;
            }

        }else{

            if (tf <= 100){

                var x_x = 0.34;

                var y_y = 0.49;

            }else{

                var x_x = 0.76;

                var y_y = 0.76;
            }
        }

        function lamda() {

            if (lam_x_bar <= lam_y_bar) return {lam_bar: lam_y_bar , alpha : y_y};

            return{lam_bar : lam_x_bar , alpha : x_x};

        }

        var {lam_bar, alpha} = lamda (); 

        var phi = 0.5 * (1 + alpha * (lam_bar - 0.2) + lam_bar * lam_bar);

        var X = 1 / (phi + Math.sqrt((phi* phi) - (lam_bar * lam_bar)));

        var Nbrd = X * design_section_area * fy * 0.0001;                                 // Buckling resistance

console.log(design_section_area)
        var As_cm = As_cm + 2;

        if (As_cm >= 808){

            location.reload();

            alert("The design load exceeded the section capacity of the steel section.")

        }else {}
        
    }while (designLoad >= Nbrd)


    //Output -----------------------------------------------------------------------


    document.getElementById("serialSize").innerHTML = serial_size ;

    document.getElementById("clsWeb").innerHTML = c_w ;


    document.getElementById("clsFlange").innerHTML = c_f ;




    //document.getElementById("as1").innerHTML = precision (As_cm);


    document.getElementById("flangeWidth").innerHTML = B ;


    document.getElementById("depth").innerHTML = D ;


    document.getElementById("heightWeb").innerHTML = d ;


    document.getElementById("thicWeb").innerHTML = tw ;


    document.getElementById("thicFlange").innerHTML = tf ;


    document.getElementById("rad").innerHTML = r ;


    document.getElementById("steelsec").innerHTML = asec_cm ;


    document.getElementById("radGyr_x").innerHTML = ix ;


    document.getElementById("radGyr_y").innerHTML = iy ;

    console.log(lam_x_bar);

    document.getElementById("slendCoffiX").innerHTML = precision (lam_x_bar);

    console.log(lam_y_bar);

    document.getElementById("slendCoffiY").innerHTML = precision (lam_y_bar);

    console.log(phi);

    document.getElementById("phi").innerHTML = precision (phi);

    console.log(X);

    document.getElementById("redFactor").innerHTML = precision (X);

    console.log(Ncrd_kN);

    document.getElementById("plasresist").innerHTML = precision (Ncrd_kN);

    console.log(Nbrd);

    document.getElementById("buckresist").innerHTML = precision (Nbrd);

    return {As_cm,D, B, tw, tf, r , d, asec_cm , ix, iy };
}
//Print function --------------------------------------------------------------------

function pagePrint() {

    window.print();
  }

//--------------------------------------------------------------------------------------