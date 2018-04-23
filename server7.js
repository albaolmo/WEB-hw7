var express = require('express');
var app = express();
var fs = require("fs");

app.get('/orders', function (req, res) {
   
       var pageNum = parseInt(req.query.page || 0);
        var perPage = parseInt(req.query.per_page || 2);
        orderList = storage.getOrders();
       var page = storage.paginate(orderList, pageNum, perPage);
    if (page.nextPage) {
      res.set("Link", "</orders?page="+page.nextPage+">;rel=next"+ "  </orders?page="+page.lastPage+">;rel=last");
    }
    res.set("X-Total-Count", orderList.length);
    res.json(page.pageData);
  
})

var server = app.listen(8087,function () {

  var host = server.address().address
  var port = server.address().port

  console.log("App listening at http://%s:%s", host, port)

})

var storage = {
    orders : [{id:"112233", customer: "customer_1", item: "item_1"},
             {id:"112234", customer: "customer_2", item: "item_2"},
             {id:"112235", customer: "customer_3", item: "item_3"},
             {id:"112236", customer: "customer_4", item: "item_4"},
             {id:"112237", customer: "customer_7", item: "item_7"}],
 
    
    
    getOrders : function(){
        
       
        return this.orders;
    },
    
    paginate : function(sourceList, page, perPage){
        var totalCount = sourceList.length;
  var lastPage = Math.floor(totalCount / perPage);
  var sliceBegin = page*perPage;
  var sliceEnd = sliceBegin+perPage;
  var pageList = sourceList.slice(sliceBegin, sliceEnd);
  return {
    pageData: pageList,
    nextPage: page < lastPage ? page+1 : null,
    totalCount: totalCount,
    lastPage: lastPage  
  }
    }
    
 
    
    
 
};