$("document").ready(() =>
{
    let num = 5;

    setInterval(() =>
    {
        num--;

        if(num === 0)
        {
            window.location.replace("./index.html");

        } else 
        {
            $("b[role='countdown'").text(num);
        }

    }, 1000);
    

    $("div[role='back-btn']").click(() =>
    {
        window.location.replace("./index.html");
    });

});