// Write your JavaScript code here!
window.addEventListener("load", function() {
   this.fetch("https://handlers.education.launchcode.org/static/planets.json").then (function(response){
      response.json().then(function(json){
         const missionTarget = document.getElementById("missionTarget");
         const index = Math.floor(Math.random() * (5 - 0)) + 0;
         missionTarget.innerHTML =
         `<h2>Mission Destination</h2>
            <ol>
               <li>Name: ${json[index].name}</li>
               <li>Diameter: ${json[index].diameter}</li>
               <li>Star: ${json[index].star}</li>
               <li>Distance from Earth: ${json[index].distance}</li>
               <li>Number of Moons: ${json[index].moons}</li>
            </ol>
         <img src="${json[index].image}">`
      })
   })
   let form = document.querySelector("form");
   let pilotName = document.querySelector("input[name=pilotName]");
   let copilotName = document.querySelector("input[name=copilotName]");
   let fuelLevel = document.querySelector("input[name=fuelLevel]");
   let cargoMass = document.querySelector("input[name=cargoMass]");
   
   form.addEventListener("submit", inputCheck);

   function inputCheck(event){
      if (pilotName.value === "" || copilotName.value === "" || fuelLevel.value === "" || cargoMass === "") {
          alert("All fields are required!");
          event.preventDefault();
       }
       else if(isNaN(pilotName.value) === false || isNaN(copilotName.value) === false || isNaN(fuelLevel.value) === true || isNaN(cargoMass.value) === true){
          alert("Make sure to enter calid information for each field!");
          event.preventDefault();
       }  
       else{
          launchStatusCheck(event);
       }
    }
    
   let faultyItems = document.getElementById("faultyItems");
   function fuelStatus(){
      let fuelLevelStatus;
      if(Number(fuelLevel.value) < 10000){
         fuelLevelStatus = `<li id="fuelStatus">Fuel level not high enough for launch</li>`;
      }
      else if(Number(fuelLevel.value) >= 10000){
         fuelLevelStatus = `<li id="fuelStatus">Fuel level is high enough for launch</li>`;
      }
      return fuelLevelStatus;
   }

   function cargoStatus(){
      let cargoStatus;
      if(Number(cargoMass.value) > 10000){
         cargoStatus = `<li id="cargoStatus">Cargo mass not low enough for launch</li>`;
      }
      else if(Number(cargoMass.value) <= 10000){
         cargoStatus = `<li id="cargoStatus">Cargo mass low enough for launch</li>`;
      }
      return cargoStatus;
   }

   function launchStatusCheck(event){
   event.preventDefault();
   if (Number(fuelLevel.value) < 10000 || Number(cargoMass) > 10000) {
   document.getElementById("launchStatus").innerHTML = `<font color = "red">Shuttle not ready for launch</font>`;
   faultyItems.style.visibility = "visible";
     faultyItems.innerHTML = 
                `<ol>
                    <li id="pilotStatus">${pilotName.value} Ready</li>
                    <li id="copilotStatus">${copilotName.value} Ready</li>
                    ${fuelStatus()}
                    ${cargoStatus()}
                </ol>`;
      }
      else{
         document.getElementById("launchStatus").innerHTML = `<font color= "green">Ready for launch</font>`;
         faultyItems.style.visibility = "hidden";
         form.submit()
      }
   }
});
/* This block of code shows how to format the HTML once you fetch some planetary JSON!
<h2>Mission Destination</h2>
<ol>
   <li>Name: ${}</li>
   <li>Diameter: ${}</li>
   <li>Star: ${}</li>
   <li>Distance from Earth: ${}</li>
   <li>Number of Moons: ${}</li>
</ol>
<img src="${}">
*/
