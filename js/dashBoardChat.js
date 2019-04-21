function callAutoCompelete(availableTags) {
  destroyAuto();
  var messageAuto = $("#message-to-send")
    .autocomplete({
      source: availableTags,
      minLength: 0,
      mustMatch: true,
      selectFirst: true,
      autoFocus: true,

      select: function select(event, ui) {
        if (!event.isDefaultPrevented()) {
          console.log($("#message-to-send").val());
        }
      },
      change: function change(event, ui) {},
      position: {
        collision: "none",
        my: "left bottom",
        at: "left top"
      }
    })
    .keyup(function() {})
    .focus(function() {
      if ($("#message-to-send").data("ui-autocomplete")) {
        $("#message-to-send").autocomplete("search", "");
      }
    });
}
//////////
function destroyAuto() {
  if ($("#message-to-send").data("ui-autocomplete")) {
    $("#message-to-send").autocomplete("destroy");
  }
}

function replaceURL(html) {
  var url1 = /(^|&lt;|\s)(www\..+?\..+?)(\s|&gt;|$)/g,
    url2 = /(^|&lt;|\s)(((https?|ftp?|http):\/\/|mailto:).+?)(\s|&gt;|$)/g,
    html = html
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(url1, '$1<a href="http://$2" target="_blank">$2</a>$3')
      .replace(url2, '$1<a href="$2" target="_blank">$2</a>$5');
  return html;
}

function linkify(inputText) {
  var replacedText, replacePattern1, replacePattern2, replacePattern3;

  var str = inputText; //"https://drive.google.com/open?id=1ud3TtBlhCcsFPLM2oXU108mxNEaeOzJk";
  var str2 = str.indexOf("open?id=");
  var str1 = $.trim(str.substring(str2 + 8));
  if (str2 != -1) {
    var str3 =
      "<div><iframe class='iframetrack' src=\"https://drive.google.com/file/d/" +
      str1 +
      '/preview" width="280" height="300"></iframe></div>';
    return str3;
  }

  //URLs starting with http://, https://, or ftp://
  replacePattern1 = /(\b(https?|ftp):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gim;
  replacedText = inputText.replace(
    replacePattern1,
    '<a href="$1" target="_blank">$1</a>'
  );

  //URLs starting with "www." (without // before it, or it'd re-link the ones done above).
  replacePattern2 = /(^|[^\/])(www\.[\S]+(\b|$))/gim;
  replacedText = replacedText.replace(
    replacePattern2,
    '$1<a href="http://$2" target="_blank">$2</a>'
  );

  //Change email addresses to mailto:: links.
  replacePattern3 = /(([a-zA-Z0-9\-\_\.])+@[a-zA-Z\_]+?(\.[a-zA-Z]{2,6})+)/gim;
  replacedText = replacedText.replace(
    replacePattern3,
    '<a href="mailto:$1">$1</a>'
  );

  return replacedText;
}
/*Chat Socket Functions */
$(document).ready(function() {
  window.dashboardChat = function(passedWorkflowId) {
    var chatPopUpHtml = `
    <article id="chatBoatIframeWrap" class="vizInternalChat" style="display:none">
    <div class="window-minimal fullScreen chatContainer">
         <div class="custColLeft" id="custColLeft">
          <header>
                 <section>
                    <img src="data:image/png;base64,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">
                     <h3>
                         Username
                     </h3>
                     <div class="chatActionIcons">
                     <span class="icons_chat"
                     ><i class="fa fa-window-minimize" aria-hidden="true"></i
                   ></span>
                   <span class="icons_chat"
                   ><i class="fa fa-times-circle" aria-hidden="true"></i
                 ></span>
                     </div>
                 </section>
             </header>
         </div>
         <div class="custColRight" id="custColRight">
             <div class="msgBody" id="messageBody">
             </div>
             <div class="errorMessage">
             </div>

             <footer id="msg_footer">
                 <div class="textAreaWrap">
                     <textarea name="message-to-send" id="message-to-send" placeholder="Type a Message"></textarea>
                 </div>
                 <button class="sendBtn" id="cutomSendBtn">
                     <span class="icon-paper-plane"></span>
                 </button>
             </footer>
            </div>
       </div>
       </article>
    `;
    $("#chatBoatIframeWrap").remove();
    $("body").append(chatPopUpHtml);
    $("body").on("click", ".openChatPopUp", function(e) {
      var username = $(this).data("username")
        ? $(this).data("username")
        : $(this).data("guid");
      e.stopPropagation();
      $("#chatBoatIframeWrap").show();
      $("#chatBoatIframeWrap header h3").text(username);
      openChat(
        $(this).data("guid"),
        $(this).data("username"),
        passedWorkflowId,
        $(this)
      );
    });

    var $chat = {};
    $chat.tid = $app.tid;
    $chat.domain = window.location.hostname;
    $chat.logdomain = window.location.hostname;
    $chat.socketServer = "";
    $chat.adminId = $app.user.id;
    $chat.adminName = $app.user.name;
    $chat.window_workflowId = "";
    $chat.window_user = "";
    $chat.customerName = "Guest";
    $chat.workflowName = "Workflow";
    $chat.iconDiv = "";
    console.log("$chat::", $chat);
    socket.off("get_flowmessages");
    socket.off("panicked");
    socket.off("broadcast_handlerSet");
    socket.off("broadcast_handlerRemove");
    socket.off("online_users");
    socket.off("file_sent");
    socket.off("userDisconnected");
    socket.off("realtime_msg");
    $app.do({
      action: function() {
        socket.emit("set_admin", {
          user: "Admin",
          tid: $app.tid,
          adminId: $app.user.id,
          adminName: $app.user.name
        });
      }
    });
    var SCRIPT_REGEX = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi;
    window.openChat = function(guid, username, workflowId, icondiv) {
      $chat.window_workflowId = workflowId;
      $chat.window_user = guid;
      $chat.customerName = username;
      $chat.iconDiv = icondiv;
      showChatHistory();
    };

    var clearChatHistory = function() {
      $("#messageBody").empty();
    };

    var showChatHistory = function() {
      $("#chatBoatIframeWrap").show();
      clearChatHistory();
      $("#chatBoatIframeWrap header h3").text($chat.customerName);
      socket.emit("get_flowmessages", {
        to: $chat.window_user,
        from: $chat.window_workflowId,
        logdomain: $chat.logdomain,
        tid: $chat.tid,
        userId: $chat.adminId
      });
    };

    var scrollToBottom = function scrollToBottom() {
      var msg_blk = document.getElementById("messageBody");
      window.setTimeout(function() {
        $(msg_blk).animate(
          { scrollTop: msg_blk.scrollHeight - msg_blk.clientHeight },
          50
        );
      }, 0);
    };

    var getTime_Func = function() {
      var date = new Date();
      var time = date.toLocaleString("en-IN", {
        hour: "numeric",
        minute: "numeric",
        hour12: true
      });
      return time;
    };

    function appendCard(msgData, msg, i, time) {
      $("#typingIndication").remove();
      var message_div = buildDiv_Func("workflow", msg, time);
      console.log("message_div::", message_div);
      if (message_div.find(".card").length) {
        message_div.find(".thread").addClass("hasCard");
      }
      $("#messageBody")
        .append(message_div)
        .find(".sliderOverflowwrap");
      // .cardSlider();
      if (msgData.jsCodes) eval(msgData.jsCodes[0]);
    }

    function buildCards(msgData, time) {
      var MessageBody = msgData.body || msgData.Body;
      if (MessageBody.indexOf("<div") == -1) MessageBody = linkify(MessageBody);
      if (!$($.parseHTML(MessageBody)).hasClass("card")) {
        MessageBody = MessageBody.replace("[", "<br/>[");
        MessageBody = MessageBody.replace(/]/g, "</a>");
        MessageBody = MessageBody.replace(
          /\[/g,
          "<a class='returntext button'>"
        );
      }
      MessageBody = MessageBody.split("/repost").map(function(item) {
        return item.trim();
      });
      MessageBody.map(function(msg, i) {
        appendCard(msgData, msg, i, time);
      });
    }

    socket.on("get_flowmessages", function (gt_msgs) {
      console.log("logs:::", gt_msgs);
      if (gt_msgs) {
        gt_msgs.reverse();
        var totalmessages = gt_msgs === null ? 0 : gt_msgs.length;
        if (totalmessages > 0) {
          clearChatHistory();
          for (var i in gt_msgs) {
            var msgData = gt_msgs[i];
            if (msgData.body) {
              var jsdate = msgData["created-at"];
              var time =
                jsdate.substr(jsdate.indexOf(" ") + 1) +
                " " +
                jsdate.substr(0, jsdate.indexOf(" "));
              var MessageBody = msgData.body;
              var message_div;
              if (gt_msgs[i].from == $chat.window_user) {
                message_div = buildDiv_Func("guest", MessageBody, time);
                $("#messageBody").append(message_div);
              } else {
                buildCards(msgData, time, "");
              }
            }
          }
          scrollToBottom();
        }
      }
    });

    var buildDiv_Func = function buildDiv_Func(side, msg, time) {
      var message_div;
      if (side == "workflow" || side == "author") {
        message_div = $(
          "<section><label>" +
            `${side == "author" ? $chat.adminName : $chat.workflowName}` +
            '</label><div class="thread">' +
            msg +
            '</div><span class="time">' +
            time +
            `${side == "author" ? ", Today" : ""}` +
            "</span></section>"
        );
      } else {
        message_div = $(
          "<article><label>" +
            `${$chat.customerName ? $chat.customerName : $chat.window_user}` +
            '</label><div class="thread">' +
            $.trim(msg).replace(/\u200B/g, "") +
            '</div><span class="time">' +
            time +
            "</span></article>"
        );
      }
      return message_div;
    };
    socket.on("panicked", function(data) {});
    socket.on("broadcast_handlerSet", function(data) {});
    socket.on("broadcast_handlerRemove", function(data) {});
    socket.on("handlerObj", function(handlerObj) {});
    socket.on("online_users", function(userObj) {});
    socket.on("userDisconnected", function(guid) {});

    socket.on("special_msg", function(msg) {
      var displayMsg = `<div id="special_msg"><span>${msg}<br></span></div>`;
      document.getElementById("messageBody").innerHTML += displayMsg;
      scrollToBottom();
      setTimeout(function() {
        $("#special_msg").remove();
      }, 3000);
    });

    socket.on("file_sent", function(data) {
      console.log("file_sent-->", data.from);
      var time = getTime_Func();
      if ($("#chat_window").is(":visible") && $chat.window_user == data.from) {
        var message_div = `
                    <li>
                    <div class="message-data">
                        <span class="message-data-name"><i class="fa fa-circle online"></i> ${
                          $chat.customerName
                        }</span>
                        <span class="message-data-time">${time}, Today</span>
                    </div>
                    <div class="message my-message fileAtchMsg">
                        <i class="fa fa-paperclip" aria-hidden="true"></i>
                        <a target="_blank" download="${data.filename}" href="${
          data.fileRaw
        }">${data.filename}</a>
                        <div class="fileComment">${data.comment}</div>
                    </div>
                    </li>
                    `;
        document.getElementById("chat_message_block").innerHTML += message_div;
        $(".chat-num-messages").text($("#chat_message_block li").length);
        scrollToBottom();
      }
    });

    socket.on("realtime_msg", function(data) {
      console.log("realtime_msg-->", data);
      if (data.Body) {
        var time = getTime_Func();
        if (
          $("#chatBoatIframeWrap").is(":visible") &&
          $chat.window_user == data.guid
        ) {
          if (data.from == $chat.window_user) {
            message_div = buildDiv_Func("guest", data.Body, time);
            $("#messageBody").append(message_div);
          } else {
            buildCards(data, time, "");
          }
          scrollToBottom();
        }
      }
    });

    $("#chatBoatIframeWrap .chatActionIcons .fa-times-circle").click(
      function() {
        $("#chatBoatIframeWrap").hide();
        clearChatHistory();
      }
    );
    $("body").on(
      "click",
      "#chatBoatIframeWrap .chatActionIcons .fa-window-minimize",
      function() {
        $(this)
          .closest("#chatBoatIframeWrap")
          .toggleClass("minimize");
      }
    );

    $("#message-to-send").keydown(function(e) {
      if ((e.keyCode || e.which) == 13 && e.shiftKey) {
        // prevent default behavior
      } else if ((e.keyCode || e.which) == 13) {
        //Enter keycode
        e.preventDefault();
        SentMessage_Func({ display: true });
      }
    });
    // $("#cutomSendBtn").click(function(e) {
    //   SentMessage_Func({ display: true });
    // });

    var SentMessage_Func = function SentMessage_Func(options) {
      var message = options.msg || $("#message-to-send").val();
      while (SCRIPT_REGEX.test(message)) {
        message = message.replace(SCRIPT_REGEX, "");
      }
      var message_div;
      message = message.replace(/\n/g, "</br>");
      var time = getTime_Func();
      if (message != "") {
        var msg_data = {
          to: $chat.window_user,
          workflowId: $chat.window_workflowId,
          from: $chat.window_workflowId,
          domain: $chat.domain,
          logdomain: $chat.logdomain,
          Agent: "admin",
          tid: $chat.tid,
          adminId: $chat.adminId,
          adminName: $chat.adminName,
          adminEmail: $app.user.email,
          Body: message
        };
        console.log("msg_data:::", msg_data);
        // if (chatOptions.socketConnect && chatOptions.connection == false) {
        //   chatOptions.notReceivedMsg++;
        // }

        message = replaceURL(message);
        message = $.parseHTML(message)[0].data;

        message_div = buildDiv_Func("author", message, time);
        $("#typingIndication").remove();
        if (options.display) $("#messageBody").append(message_div);
        if (!options.msg) $("#message-to-send").val("");
        scrollToBottom();
        socket.emit("admin_msg", msg_data);
      }
    };
  };
});
