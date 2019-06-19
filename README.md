# structuraleng

<html>
<head>
<title>RC Beam Design </title>
<script src="general.js"></script>
<script src="beamdesign.js"></script>
</head>

<body>
<h1>Singly Reinforced Beam Design For Flexure</h1>

<a href="RC Beam design description.pdf">Description</a><br />


<p>
Precision: <input type="text" id="digits" value="3" size="2">
</p>

<p> Replace the Live load and Dead load values.</p>
<p>Insert the beam dimension.</p>

<p>
    
<img src="Simply supported beam.PNG" alt="Simply supported beam" width="500" height="150">
<img src="RC bream section.PNG" alt="RC bream section" width="50" height="100">

</p>

<!-- Table format with border and spacing-->

<style> 
table, th, td {
  border: 1px solid black;
}
th, td {
  padding: 5px;
}
</style>

<table style="width:50%" >

<tr>
<th colspan="3">Section</th>
<th colspan="3">Load </th>
<th colspan="3">Material </th>
</tr>

<tr>
               <td>Width(b)</td>
               <td><input type="text" id="b" value="0.4" size="10"></td>
               <td>m</td>
               
               <td>Dead Load</td>
               <td><input type="text" id="dl" value="4.0" size="10"></td>
               <td>KN/m</td>
               
               <td>Concrete grade</td>
               <td><select id="ctype">

                <option value="20000"                   >C20/25</option>     <!--Strength of concrete in KN/m^2 devided by 1.5 material safety factor according to Euro Code-->
                <option value="25000"           selected>C25/30</option>
                <option value="30000"                   >C30/37</option>
                <option value="35000"                   >C35/45</option>
                <option value="40000"                   >C40/50</option>
                <option value="45000"                   >C45/55</option>
                <option value="50000"                   >C50/60</option>

</select></td>
            </tr> 
<tr>

               <td>Depth (d)</td>
               <td><input type="text" id="d" value="0.6" size="10"></td>
               <td>m</td>
               
                <td>Live Load</td>
               <td><input type="text" id="ll" value="2.0" size="10"></td>
               <td>KN/m</td>
               
               <td>Steel Grade</td>
              <td><select id="stype">
                      <option value="221739.1304"            >S255 </option>      <!--Steel yield Strength divided by material safety factor 1.15 -->
                      <option value="260869.5652"            >S300</option>
                      <option value="434782.609"    selected >S500 </option>
                   </select></td>
                      
            </tr>
<tr>
               <td>Length</td>
               <td><input type="text" id="l" value="6.0" size="10"></td>
               <td>m</td>
           
               <td>Design Load (q)</td>
               <td><p id="dsl"></p></td>
               <td>KN/m</td>
              
              <td>Bar Size</td>
              <td><select id="dtype">
              
                      <option value="50.3"            >D8 </option>        <!-- Area of the steel bar for the specific diameter in mm^2-->
                      <option value="78.5"            >D10 </option>              
                      <option value="113"             >D12 </option>              
                      <option value="201"             >D16 </option>
                      <option value="314"    selected >D20</option>
                      <option value="491"             >D25 </option>
                      <option value="804"             >D32 </option>
                      <option value="1260"            >D40 </option>
                   </select></td>
              
<tr>
<td colspan="3"></td>

               <td>Design Moment</td>
               <td><p id="dsm"></p></td>
               <td>KN-m</td>
               
             </tr>
                         
           </table>
           
           <p><button onclick="designcalculation()">Design</button></p>
           
       <p>
         <table>  
         <col width="150">
         <col width="80">
        <tr>
        <th colspan="3">Design Values</th>

</tr>
         
            <tr> 
            <td>K value</td>
            <td> <p id="k"></p></td>
           </tr>
            <tr> 
            <td>Lever arm Z</td>
            <td> <p id="z"></p></td>
            <td>m</td>
          </tr>
 
            <tr> 
            <td>Steel Area (A<sub>s</sub>)</td>
            <td> <p id="as1"></p></td>
            <td>mm<sup>2</sup></td>
          </tr>
     
<tr> 
            <td>No of Reinf. Bar </td>
            <td> <p id="n"></p></td>
            
          </tr>     
     
         </table>
      </p>
      
      
</body>
</html>
