export default class Tool {
    static makeCancelable(promise) {
        let hasCanceled_ = false;
        const wrappedPromise = new Promise((resolve, reject) => {
            promise.then((val) =>
                hasCanceled_ ? reject({ isCanceled: true }) : resolve(val)
            );
            promise.catch((error) =>
                hasCanceled_ ? reject({ isCanceled: true }) : reject(error)
            );
        });
        return {
            promise: wrappedPromise,
            cancel() {
                hasCanceled_ = true;
            },
        };
    }

    static format(fmt,n) { //author: meizz 

	var date = new Date(fmt);  
    var y = date.getFullYear();    
    var m = date.getMonth() + 1;    
    m = m < 10 ? ('0' + m) : m;    
    var d = date.getDate();    
    d = d < 10 ? ('0' + d) : d;    
    var h = date.getHours();  
    h = h < 10 ? ('0' + h) : h;  
    var minute = date.getMinutes();  
    var second = date.getSeconds();  
    minute = minute < 10 ? ('0' + minute) : minute;    
    second = second < 10 ? ('0' + second) : second;   
    return n?(y + '-' + m + '-' + d):(y + '-' + m + '-' + d+' '+h+':'+minute+':'+second);    
  }

  static fileName(url) {
	return url.split("/").pop();
   }

}