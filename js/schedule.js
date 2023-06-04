const table     = document.getElementsByTagName("tbody")[0];
const dateInput = document.getElementsByTagName("input");
const date      = new Date();
const dateNow   = `${date.getFullYear()}-${(date.getMonth() + 1) < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1}-${(date.getDate() < 10) ? `0${date.getDate()}` : date.getDate()}`;

dateInput[3].min = dateNow;
dateInput[3].value = dateNow;

const dateFunc = (dateVal) =>
{
    let countDays       = 0;
    let totalDays       = 0;
    let scheduleContext = "";
    let moduleNum       = 0;

    while(countDays < 6)
    {
        const weekday = new Date(new Date().setDate(new Date(dateVal).getDate() + totalDays)).getDay();
        const date    = new Date(new Date().setDate(new Date(dateVal).getDate() + totalDays));

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
}

dateInput[3].addEventListener("change", (e) =>
{
    const dateValue = dateInput[3].value;

    for(let i = 6; i > 0; i--)
    {
        table.children[i].remove();
    }

    dateFunc(dateValue);

});

dateFunc(dateNow);

// fetch("https://docs.google.com/spreadsheets/d/15Y6r7c14lG_zG9C77OH3GtNlAB1SbdrzCHUuB8iKZGM")
// .then(response => response.text())
// .then(result => console.log(result));