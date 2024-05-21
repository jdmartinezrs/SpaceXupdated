import { 
    getAllRockets, 
    getAllRocketsId
} from "../modules/rockets.js";
import { 
    nameRockets,
    nameCapsules 
} from "./title.js";
import { 
    informationRockets,
    informationLaunchCostRocket,
    informationFirstFlightRocket,
    informationWebRocket,
    capsulesIdPage,
    capsulesType,
    capsulesStatus
} from "./information.js";
import { 
    tableRocketColum1, 
    tableRocketColum2
} from "./tables.js";
import { 
    informRocketEngineThrustSeaLevel, 
    informRocketEngineThrustVacuum,
    informRocketFirstStageThustVacuum,
    informRocketFirstStageThrustSeaLevel,
    informRocketSecondStageFuelAmountTons,
    informFirstStageBurnTimeSec,
    informRocketBurnTimeSec
   
} from "./inform.js";
import { 
    imageRockets 
} from "./card.js";
import { 
    progressRocketWeight,
    progressPayloadWeights, 
    progressHeightRocket, 
    progressDiameterRocket,
    progressSecondStageDiameterRocket,
    progressSecondStageHeightRocket,
} from "../modulesComponents/progressBar.js";

import{
    getAllCapsules,
    getAllCapsulesId,
    getCapsules 
} from "../modules/capsules.js"

export const load = async()=>{
    let header__title = document.querySelector("#header__title");
    header__title.innerHTML = `
        <div class="load"></div>
    `;

    let description__item = document.querySelector("#description__item");
    description__item.innerHTML = `
        <div class="load"></div>
        <div class="load"></div>
        <div class="load"></div>
        <div class="load"></div>
        <div class="load"></div>
    `;

    let section__information__1 = document.querySelector("#section__information__1")
    section__information__1.innerHTML = `
        <div class="load" style="height: 150px;"></div>
    `;

    let information__table__1 = document.querySelector("#information__table__1")
    information__table__1.innerHTML = `
        <div class="load" style="height: 160px;"></div>
    `;

    let section__image = document.querySelector("#section__image")
    section__image.innerHTML = `
        <div class="load" style="height: 350px"></div>
    `;


    let information__table__2 = document.querySelector("#information__table__2")
    information__table__2.innerHTML = `
        <div class="load" style="height: 160px;"></div>
    `;

    let information__2 = document.querySelector("#information__2")
    information__2.innerHTML = `
        <div class="load"></div>
        <div class="load"></div>
        <div class="load"></div>
        <div class="load"></div>
        <div class="load"></div>
    `;
}
export const clear = async()=>{
    let header__title = document.querySelector("#header__title");
    header__title.innerHTML = ``;

    let description__item = document.querySelector("#description__item");
    description__item.innerHTML = ``;

    let section__information__1 = document.querySelector("#section__information__1")
    section__information__1.innerHTML = ``;

    let information__table__1 = document.querySelector("#information__table__1")
    information__table__1.innerHTML = ``;

    let section__image = document.querySelector("#section__image")
    section__image.innerHTML = ``;


    let information__table__2 = document.querySelector("#information__table__2")
    information__table__2.innerHTML = ``;

    let information__2 = document.querySelector("#information__2")
    information__2.innerHTML = ``;

}

const getRocketsId = async(e)=>{
    e.preventDefault();
    let a = e.target.parentElement.children;
    for(let val of a){
        val.classList.remove('activo');
    }
    e.target.classList.add('activo');
    
    let information__2 = document.querySelector("#information__2");
    information__2.innerHTML = "";
    let description__item = document.querySelector("#description__item")
    description__item.innerHTML = "";
    let section__image = document.querySelector("#section__image")
    section__image.innerHTML = "";
    let section__information__1 = document.querySelector("#section__information__1")
    section__information__1.innerHTML = "";
    let container__1 = document.querySelector("#container__1")
    container__1.innerHTML = "";
    let container__2 = document.querySelector("#container__2")
    container__2.innerHTML = ""; 
    

    let Rocket = await getAllRocketsId(e.target.id);

    await informationRockets(Rocket.country, Rocket.description)
    await nameRockets(Rocket.name)
    await informationLaunchCostRocket(Rocket.cost_per_launch)
    await informationFirstFlightRocket(Rocket.first_flight)
    await informationWebRocket(Rocket.wikipedia)

    await informRocketEngineThrustSeaLevel(Rocket.engines.thrust_sea_level);
    await informRocketEngineThrustVacuum(Rocket.engines.thrust_vacuum);
    await informRocketFirstStageThustVacuum(Rocket.first_stage.thrust_vacuum);
    await informRocketFirstStageThrustSeaLevel(Rocket.first_stage.thrust_sea_level)
    await informRocketSecondStageFuelAmountTons(Rocket.second_stage.fuel_amount_tons)
    await informFirstStageBurnTimeSec(Rocket.first_stage.burn_time_sec)
    await informRocketBurnTimeSec(Rocket.second_stage.burn_time_sec)
    await imageRockets(Rocket.flickr_images);


    await progressRocketWeight(Rocket)
    await progressPayloadWeights(Rocket)
    await progressHeightRocket(Rocket)
    await progressDiameterRocket(Rocket)
    await progressSecondStageDiameterRocket(Rocket)
    await progressSecondStageHeightRocket(Rocket)
    await tableRocketColum1(Rocket)
    await tableRocketColum2(Rocket)
}
export const paginationRockets = async()=>{
    let rockets = await getAllRockets();
    let div = document.createElement("div");
    div.classList.add("buttom__paginacion")
  
    rockets.forEach((val,id) => {
        let a = document.createElement("a");
        a.setAttribute("href","#");
        a.id = val.id;
        a.textContent = id+1;
        a.addEventListener("click", getRocketsId)
        div.appendChild(a);
    });
    let [a1,a2,a3,a4] = div.children
    a1.click();
    // <div class="buttom__paginacion">
    //     <a href="#">&laquo;</a> 
    //     <a href="#" class="activo">1</a>
    //     <a href="#">2</a>
    //     <a href="#">3</a>
    //     <a href="#">4</a>
    //     <a href="#">&raquo;</a>
    // </div>
    return div;
}

const getCapsulesId = async (e) => {
    e.preventDefault();
  
    if(e.target.dataset.page){
        let paginacion = document.querySelector("#paginacion");
        paginacion.innerHTML = ""
        paginacion.append(await paginationCapsules(Number(e.target.dataset.page)))
        setTimeout(() => {
            let paginacion = document.querySelector("#paginacion");
            let a1 = paginacion.children[0].children[1]
            
            a1.click();
        }, 200);
    }
  
    let a = e.target.parentElement.children;
    for (let val of a) {
      val.classList.remove('activo');
    }
    e.target.classList.add('activo');
  
    let capsules = await getAllCapsulesId(e.target.id);
    console.log(capsules);

    await nameCapsules(capsules.serial);

    let description__item = document.querySelector("#description__item");
    description__item.innerHTML = "";

    let capsulesIdPageElement = await capsulesIdPage(capsules.id);
    description__item.append(capsulesIdPageElement);

    let capsulesTypeElement = await capsulesType(capsules.type);
    description__item.append(capsulesTypeElement);
  
    let capsulesStatusElement= await capsulesStatus(capsules.status);
    description__item.append(capsulesStatusElement);

    ///aqui se colocarà para la proxima

    // let description__item = document.querySelector("#description__item");
    // description__item.innerHTML = "";

}




export const paginationCapsules = async(page=1, limit=4)=>{  
     
    let {docs, pagingCounter, totalPages, nextPage} = await getAllCapsules(page, limit)

    let div = document.createElement("div");
    div.classList.add("buttom__paginacion")

    
    let start = document.createElement("a");
    start.setAttribute("href","#");
    start.innerHTML = "&laquo";
    start.setAttribute("data-page", (page==1) ? totalPages : page-1)
    start.addEventListener("click", getCapsulesId)
    div.appendChild(start);
    docs.forEach((val,id) => {
        let a = document.createElement("a");
        a.setAttribute("href","#");
        a.id = val.id;
        a.textContent = pagingCounter;
        a.addEventListener("click", getCapsulesId)
        div.appendChild(a);
        pagingCounter++
    });
    let end = document.createElement("a");
    end.setAttribute("href","#");
    end.innerHTML = "&raquo;";
    end.setAttribute("data-page", (page && nextPage) ? page+1 : 1)
    end.addEventListener("click", getCapsulesId)
    div.appendChild(end);
    console.log(div);
    let [back, a1,a2,a3,a4, next] = div.children
    a1.click();
    // <div class="buttom__paginacion">
    //     <a href="#">&laquo;</a> 
    //     <a href="#" class="activo">1</a>
    //     <a href="#">2</a>
    //     <a href="#">3</a>
    //     <a href="#">4</a>
    //     <a href="#">&raquo;</a>
    // </div>
    return div;
}