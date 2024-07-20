function dateFillter(date){
    const currentDate = new Date()
    let createdDateString
    if (date) {
        createdDateString =`${date} ${currentDate.getHours() > 9 ? currentDate.getHours() : "0" + currentDate.getHours()}:${currentDate.getMinutes() > 9 ? currentDate.getMinutes() : "0" + currentDate.getMinutes()}:${currentDate.getSeconds() > 9 ? currentDate.getSeconds() : "0" + currentDate.getSeconds()}`;
    }
    return createdDateString;
}

export default dateFillter;


