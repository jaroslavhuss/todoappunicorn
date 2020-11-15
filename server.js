/**
 * Deklarace proměnných
 */
const submitButton = document.getElementById("submit-btn");
const vstupniPole = document.getElementById("add-item");
const hlavniForm = document.getElementById("hlavni-form");
const vypisItemu = document.getElementById("vypis-itemu");
const pocetTasku = document.getElementById("count-of-tasks");
const zmenaStatusu = document.getElementsByClassName("task-status-circle");
const btnVsechnyCompleted = document.getElementById("complete");
const btnDeleteCompleted = document.getElementById("clear");
const filterAll = document.getElementById("all");
const filterCompleted = document.getElementById("completed");
const filterInProgress = document.getElementById("inprogress");
const filterNotStarted = document.getElementById("notstarted");
const tasks = [];


/**
 * Deklarace funkcí
 */
//zastavní nativní chování formuláře
const zastavNativniChovaniFormulare = () => {
    const submitButton = document.getElementById("submit-btn");
    submitButton.addEventListener("click", (e) => {
        e.preventDefault();
    }
    )
}

//přidej task do pole a vypiš ho
const pridejTask = () => {
    
   submitButton.addEventListener("click", () => {
       if(vstupniPole.value.length > 0){
       tasks.push({
           task:vstupniPole.value,
           status:"Not-started"
       });
        hlavniForm.reset();
       //Zde udělej něco po kliknutí
       zobrazVsechnyTasky();
    }
   }
   )
 
}
  // zobrazení tasku ve formuláři
  function zobrazVsechnyTasky(){
    vypisItemu.innerHTML = ""; 
   tasks.forEach((singleTask) => {
       const {task, status} = singleTask;
       vypisItemu.innerHTML += `
       <div class="singleItem">
       <span class="task-status"><span class="task-status-circle ${status}"></span>${task}</span>
       <span class="task-name ${status}">${status}</span>
       </div>`;
   }
   )
   prepocitejTasky();
   menicStatusu();
  } 

 //Zobrazí počet tasků  
function prepocitejTasky(){
    pocetTasku.innerHTML = tasks.length;
}
//Na kliknutí změní status tasku
function menicStatusu(){      
    for (let i = 0; i < zmenaStatusu.length; i++) {
        zmenaStatusu[i].addEventListener("click",(e) => {
            const {status} = tasks[i];
   
           switch (status) {
               case "Not-started":
                   tasks[i].status = "In-progress"
                   break;
               case "Completed":
                   tasks[i].status = "In-progress"
                   break;
               case "In-progress":
                   tasks[i].status = "Completed"
                   break;
               default:
                   console.log("Do nothing")
                   break;
           }
           zobrazVsechnyTasky();
        }
        )
        
    }
  }

  //Všem taskům hoď status jako Completed
const hodVsechnyTaskyJakoKompleted = () => {
    tasks.forEach((singleTask) => {
        singleTask.status = "Completed";
    }
    );
    zobrazVsechnyTasky();
 }
 //Vymaže všechny tasky, co mají status Completed
const vymazVsechnyTaskyCoJsouCompleted = () => {
    tasks.forEach((singleTask,index) => {
        if(singleTask.status === "Completed"){
           tasks.splice(index,1);
        }
    }
    );
    zobrazVsechnyTasky();
    prepocitejTasky();
 }
//Filtrovací funkce - tato funkce nebude šahat na hlavní array
 function filtruj(ukol){
    let filteredArray = [];
   switch (ukol) {
       case "all":
           filteredArray = tasks;
           break;
       case "completed":
           tasks.forEach((task) => {
               if(task.status === "Completed"){
                   filteredArray.push(task);
               }
           }
           )
           break;
       case "inprogress":
           tasks.forEach((task) => {
               if(task.status === "In-progress"){
                   filteredArray.push(task);
               }
           }
           )
           break;
       case "notstarted":
           tasks.forEach((task) => {
               if(task.status === "Not-started"){
                   filteredArray.push(task);
               }
           }
           )
           break;
   
       default:
           console.log("Do nothing")
           break;
   }
   vypisItemu.innerHTML = ""; 
   filteredArray.forEach((singleTask) => {
       const {task, status} = singleTask;
       vypisItemu.innerHTML += `
       <div class="singleItem">
       <span class="task-status"><span class="task-status-circle ${status}"></span>${task}</span>
       <span class="task-name ${status}">${status}</span>
       </div>`;
   }
   )
   prepocitejTasky();
   menicStatusu();
}

 /**
  * Event Listenery na jednotlivá tlačítka
  */
 btnVsechnyCompleted.addEventListener("click",() => {
     hodVsechnyTaskyJakoKompleted();
 }
 );
 btnDeleteCompleted.addEventListener("click", () => {
     vymazVsechnyTaskyCoJsouCompleted();
 }
 );

 
filterAll.addEventListener("click", () => {
    filtruj("all");
}
);
filterCompleted.addEventListener("click", () => {
    filtruj("completed");
}
);
filterInProgress.addEventListener("click", () => {
    filtruj("inprogress");
}
);
filterNotStarted.addEventListener("click", () => {
    filtruj("notstarted");
}
)
//Hlavní funkce
function main (){
zastavNativniChovaniFormulare();
pridejTask();
}
main()