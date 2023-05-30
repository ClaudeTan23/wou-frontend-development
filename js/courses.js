const totalNum = 3;
const table    = document.getElementsByTagName("tbody")[0];

let countDays       = 0;
let totalDays       = 0;
let scheduleContext = "";
let moduleNum       = 0;

const closeTab1 = () =>
{
    $(".r-block").fadeOut(10);
}

const closeTab2 = () =>
{
    $(".module-container").fadeOut(10);
}

const closeTab3 = () =>
{
    $(".schedule-container").fadeOut(10);
}

$(".b-content[view='1']").click(() =>
{
    $(".r-block").fadeIn(10);
    closeTab2();
    closeTab3();
});

$(".b-content[view='2']").click(() =>
{
    $(".module-container").fadeIn(10);
    closeTab1();
    closeTab3();
});

$(".b-content[view='3']").click(() =>
{
    $(".schedule-container").fadeIn(10);
    closeTab1();
    closeTab2();
});

$(".b-content[view='4']").click(() =>
{
    $(".modal-container").fadeIn(300);
});

for(let i = 0; i < 3; i++)
{
    document.getElementsByClassName("module-header-block")[i].addEventListener("click", () => 
    {
        $(`.module-content[module='${i + 1}']`).slideToggle(300);
    });

}

while(countDays < 6)
{
    const weekday = new Date(new Date().setDate(new Date().getDate() + totalDays)).getDay();
    const date    = new Date(new Date().setDate(new Date().getDate() + totalDays));

    if(weekday !== 0 && weekday !== 6)
    {
        const trElement = document.createElement("tr");

        if(countDays % 2 === 0) moduleNum++;

        trElement.innerHTML = `<td>Module ${moduleNum}</td>
                               <td>Day ${countDays + 1}</td>
                               <td>${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}</td> `;
        
        table.appendChild(trElement);
        countDays++;
    }

    totalDays++;
    
}

