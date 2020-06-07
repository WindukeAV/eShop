function Model(initalData, getSubject) {
  var subject = new Subject(initalData);

  this.subscribe = subject.subscribe;
  this.unsubscribe = subject.unsubscribe;
  this.getData = subject.getData;

  if (typeof getSubject === 'function') {
    getSubject(subject);
  }
}

//Заполнить модель товарами. 
//Подписаться Вью на модель.