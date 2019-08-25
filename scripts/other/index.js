var main = {};

(function($) {
    main.init = function() {
        main.initEvent();
    };

    main.initEvent = function() {
        /**
         * @desc 提交事件
         */
        $(document).on("click","#submit-btn",function() {
           var code = $("#code-no").val();

            if($.trim(code) == "") {
                common.alert({
                    content: "请输入您的UM编号"
                });

                return false;
            }

            // ajax请求
            var url = "https://order.letsun.com.cn/w/pakj/login/252";

            $.ajax({
                type: 'GET',
                url: url,
                dataType: 'jsonp',
                data:{
                    name: code,
                    openid: common.opid,
                    ts: (new Date()).getTime()
                },
                jsonp: "submitCode",
                error: function(XmlHttpRequest,textStatus,errorThrown){
                    alert("请求出错!");
                },
                success: function(res){
                    console.log(res);
                    if(res.status == 0) {
                        common.alert({
                            content: res.msg
                        })
                    }

                    if(res.status == 1) {
                        window.location.href = "./code.html?code=" + res.code;
                    }
                }
            });
        });
    };
})(jQuery);
