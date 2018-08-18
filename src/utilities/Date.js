var getThursdayOfCurrentWeek = () =>
{
    let d = new Date();
    let day = d.getDay();
    return new Date(d.getFullYear(), d.getMonth(), d.getDate() + (day === 0?-6:1)-day );
}

var getSundayOfCurrentWeek = () =>
{
    let d = new Date();
    let day = d.getDay();
    return new Date(d.getFullYear(), d.getMonth(), d.getDate() + (day === 0?0:7)-day );
}


module.exports = {getThursdayOfCurrentWeek, getSundayOfCurrentWeek};