"use strict";
/* files, templates, dashboard, member */
var tourArray = new Array();
tourArray['livespace_list'] = [  
      {  
         "element":"a#vizrulogo",
         "title":"Logo",
         "content":"For main menu click on the logo",
         "placement":"right",
         "onShow":function()         {  
            showDropDown($('a#vizrulogo'))
         },
         "onNext":function()         {  
            $('a#vizrulogo').trigger('click');
			 var  itemPromise =jQuery.Deferred();setTimeout(function(){var setInt =  setInterval(function(){if( $.active == 0){  setTimeout(function(){itemPromise.resolve()},500);clearInterval(setInt);}},500);},500);return itemPromise;}
      },
      {  
         "element":"html>body>div:eq(2)>header>div:eq(0)>div>ul>li:eq(1)>a",
         "title":"My App",
         "content":"All your Apps show up here",
         "placement":"right",
         "onShow":function()         {  
            showDropDown($('html>body>div:eq(2)>header>div:eq(0)>div>ul>li:eq(1)>a'))
         },
         "onNext":function()         {  
            var  itemPromise =jQuery.Deferred();setTimeout(function(){var setInt =  setInterval(function(){if( $.active == 0){  setTimeout(function(){itemPromise.resolve()},500);clearInterval(setInt);}},500);},500);return itemPromise;}
      },
      {  
         "element":"html>body>div:eq(2)>header>div:eq(0)>div>ul>li:eq(3)>a",
         "title":"My Profile",
         "content":"You can view your profile here",
         "placement":"right",
         "onShow":function()         {  
            showDropDown($('html>body>div:eq(2)>header>div:eq(0)>div>ul>li:eq(3)>a'))
         },
         "onNext":function()         {  
            var  itemPromise =jQuery.Deferred();setTimeout(function(){var setInt =  setInterval(function(){if( $.active == 0){  setTimeout(function(){itemPromise.resolve()},500);clearInterval(setInt);}},500);},500);return itemPromise;}
      },
      {  
         "element":"html>body>div:eq(2)>header>div:eq(0)>div>ul li a[title='Users']",
         "title":"Invite People",
         "content":" Invite other users here",
         "placement":"right",
         "onShow":function()         {  
            showDropDown($('html>body>div:eq(2)>header>div:eq(0)>div>ul li  a[title="Users"]'))
         },
         "onNext":function()         {  
             var  itemPromise =jQuery.Deferred();setTimeout(function(){var setInt =  setInterval(function(){if( $.active == 0){  setTimeout(function(){itemPromise.resolve()},500);clearInterval(setInt);}},500);},500);return itemPromise;}
      },
      {  
         "element":"html>body>div:eq(2)>header>div:eq(0)>div>ul li a[title='Impersonate User']",
         "title":"Impersonate User",
         "content":" Impersonate another user here",
         "placement":"right",
         "onShow":function()         {  
            showDropDown($('html>body>div:eq(2)>header>div:eq(0)>div>ul li  a[title="Impersonate User"]'))
         },
         "onNext":function()         {  
             var  itemPromise =jQuery.Deferred();setTimeout(function(){var setInt =  setInterval(function(){if( $.active == 0){  setTimeout(function(){itemPromise.resolve()},500);clearInterval(setInt);}},500);},500);return itemPromise;}
      },
	  {  
         "element":"html>body>div:eq(2)>header>div:eq(0)>div>ul li a[title='Change Password']",
         "title":"Change Password",
         "content":"You can change your password here",
         "placement":"right",
         "onShow":function()         {  
            showDropDown($('html>body>div:eq(2)>header>div:eq(0)>div>ul li  a[title="Change Password"]'))
         },
         "onNext":function()         {  
             var  itemPromise =jQuery.Deferred();setTimeout(function(){var setInt =  setInterval(function(){if( $.active == 0){  setTimeout(function(){itemPromise.resolve()},500);clearInterval(setInt);}},500);},500);return itemPromise;}
      },
	  {  
         "element":"html>body>div:eq(2)>header>div:eq(0)>div>ul li a[title='Sign Out']",
         "title":"Sign Out",
         "content":"Click here to sign out",
         "placement":"right",
         "onShow":function()         {  
            showDropDown($('html>body>div:eq(2)>header>div:eq(0)>div>ul li  a[title="Sign Out"]'))
         },
         "onNext":function()         {  
             var  itemPromise =jQuery.Deferred();setTimeout(function(){var setInt =  setInterval(function(){if( $.active == 0){  setTimeout(function(){itemPromise.resolve()},500);clearInterval(setInt);}},500);},500);return itemPromise;}
      },{  
         "element":"#settingsLinks > a",
         "title":"Settings",
         "content":"View and manage settings here",
         "placement":"right",
         "onShow":function()         {  
            showDropDown($('#settingsLinks > a'))
         },
         "onNext":function()         {  
            var  itemPromise =jQuery.Deferred();setTimeout(function(){var setInt =  setInterval(function(){if( $.active == 0){  setTimeout(function(){itemPromise.resolve()},500);clearInterval(setInt);}},500);},500);return itemPromise;}
      },
      {  
         "element":"li#settingsLinks > div>ul>li:eq(0)>a[title='Stencil']",
         "title":"Manage Stencils",
         "content":"Manage your stencils here",
         "placement":"right",
         "onShow":function()         {  
            showDropDown($('li#settingsLinks > div>ul>li:eq(0)>a[title="Stencil"]'))
         },
         "onNext":function()         {  
            var  itemPromise =jQuery.Deferred();setTimeout(function(){var setInt =  setInterval(function(){if( $.active == 0){  setTimeout(function(){itemPromise.resolve()},500);clearInterval(setInt);}},500);},500);return itemPromise;}
      },
      {  
         "element":"li#settingsLinks > div>ul>li:eq(1)>a[title='Global Settings']",
         "title":"Configure Policies",
         "content":"Configure policies here",
         "placement":"right",
         "onShow":function()         {  
            showDropDown($('li#settingsLinks > div>ul>li:eq(1)>a[title="Global Settings"]'))
         },
         "onNext":function()         {  
             var  itemPromise =jQuery.Deferred();setTimeout(function(){var setInt =  setInterval(function(){if( $.active == 0){  setTimeout(function(){itemPromise.resolve()},500);clearInterval(setInt);}},500);},500);return itemPromise;}
      },
      {  
         "element":"li#settingsLinks > div>ul>li:eq(2)>a[title='Receiver']",
         "title":"Configure Receiver",
         "content":"Configure reciever here",
         "placement":"right",
         "onShow":function()         {  
            showDropDown($('li#settingsLinks > div>ul>li:eq(2)>a[title="Receiver"]'))
         },
         "onNext":function()         {  
            var  itemPromise =jQuery.Deferred();setTimeout(function(){var setInt =  setInterval(function(){if( $.active == 0){  setTimeout(function(){itemPromise.resolve()},500);clearInterval(setInt);}},500);},500);return itemPromise;}
      },
      {  
         "element":"li#settingsLinks > div>ul>li:eq(3)>a[title='Storage']",
         "title":"Manage Storage",
         "content":"Manage your storage here",
         "placement":"right",
         "onShow":function()         {  
            showDropDown($('li#settingsLinks > div>ul>li:eq(3)>a[title="Storage"]'))
         },
         "onNext":function()         {  
             var  itemPromise =jQuery.Deferred();setTimeout(function(){var setInt =  setInterval(function(){if( $.active == 0){  setTimeout(function(){itemPromise.resolve()},500);clearInterval(setInt);}},500);},500);return itemPromise;}
      },
      {  
         "element":"li#support>a",
         "title":"Customer Support",
         "content":"Vizru Customer Support & Tour",
         "placement":"right",
         "onShow":function()         {  
            showDropDown($('li#support>a'))
         },
         "onNext":function()         {  
            var  itemPromise =jQuery.Deferred();setTimeout(function(){var setInt =  setInterval(function(){if( $.active == 0){  setTimeout(function(){itemPromise.resolve()},500);clearInterval(setInt);}},500);},500);return itemPromise;}
      },{  
         "element":".getStarted",
         "title":"Shortcut Menu",
         "content":"Click to view shortcut menu",
         "placement":"left",
         "onShow":function()         {  
            showDropDown($('.getStarted'))
         },
         "onNext":function()         {  
            var  itemPromise =jQuery.Deferred();setTimeout(function(){var setInt =  setInterval(function(){if( $.active == 0){  setTimeout(function(){itemPromise.resolve()},500);clearInterval(setInt);}},500);},500);return itemPromise;}
      },
      {  
         "element":"html>body>section>section>div:eq(1)>ul:eq(1)>li:eq(1)>div>ul>ol>li:eq(1)>a",
         "title":"Create Shortcut",
         "content":"Click to create shortcut",
         "placement":"left",
         "onShow":function()         {  
            showDropDown($('html>body>section>section>div:eq(1)>ul:eq(1)>li:eq(1)>div>ul>ol>li:eq(1)>a'))
         },
         "onNext":function()         {  
           var  itemPromise =jQuery.Deferred();setTimeout(function(){var setInt =  setInterval(function(){if( $.active == 0){  setTimeout(function(){itemPromise.resolve()},500);clearInterval(setInt);}},500);},500);return itemPromise;}
      },
      {  
         "element":"html>body>section>section>div:eq(1)>ul:eq(1)>li:eq(1)>div>ul>ol>li:eq(0)>a",
         "title":"Edit Shortcut",
         "content":"Click to edit shortcut",
         "placement":"left",
         "onShow":function()         {  
            showDropDown($('html>body>section>section>div:eq(1)>ul:eq(1)>li:eq(1)>div>ul>ol>li:eq(0)>a'))
         },
         "onNext":function()         {  
            var  itemPromise =jQuery.Deferred();setTimeout(function(){var setInt =  setInterval(function(){if( $.active == 0){  setTimeout(function(){itemPromise.resolve()},500);clearInterval(setInt);}},500);},500);return itemPromise;}
      },
	  {  
         "element":"#staticIid article>div:eq(0)>div>a",
         "title":"Create new App",
         "content":"Create a new App here",
         "placement":"right",
         "onShow":function()         {  
            showDropDown($('#staticIid article>div:eq(0)>div>a'))
         },
         "onNext":function()         {  
            $('#staticIid article>div:eq(0)>div>a').trigger('click'); var  itemPromise =jQuery.Deferred();setTimeout(function(){var setInt =  setInterval(function(){if( $.active == 0){  setTimeout(function(){itemPromise.resolve()},500);clearInterval(setInt);}},500);},500);return itemPromise;}
      },
      {  
         "element":".modal div>div>div:eq(1)>div>div>div:eq(0)>div>form>div:eq(0)>div:eq(0)>div:eq(0)>div>input",
         "title":"App Name",
         "content":"Go ahead and type the name of your App",
         "placement":"right",
         "onShow":function()         {  
            showDropDown($('.modal div>div>div:eq(1)>div>div>div:eq(0)>div>form>div:eq(0)>div:eq(0)>div:eq(0)>div>input'))
         },
         "onNext":function(){var  itemPromise =jQuery.Deferred();setTimeout(function(){var setInt =  setInterval(function(){if( $.active == 0){  setTimeout(function(){itemPromise.resolve()},500);clearInterval(setInt);}},500);},500);return itemPromise;}
      },
      {  
         "element":".modal div>div>div:eq(1)>div>div>div:eq(0)>div>form>div:eq(0)>div:eq(1)>div:eq(2)>div>select",
         "title":"Default Path",
         "content":"File or dashboard?Select your deafult landing file",
         "placement":"left",
         "onShow":function()         {  
            showDropDown($('.modal div>div>div:eq(1)>div>div>div:eq(0)>div>form>div:eq(0)>div:eq(1)>div:eq(2)>div>select'))
         },
         "onNext":function(){var  itemPromise =jQuery.Deferred();setTimeout(function(){var setInt =  setInterval(function(){if( $.active == 0){  setTimeout(function(){itemPromise.resolve()},500);clearInterval(setInt);}},500);},500);return itemPromise;}
      },
      {  
         "element":".modal div>div>div:eq(1)>div>div>div:eq(0)>div>form>div:eq(1)>div>input",
         "title":"Save",
         "content":"Click here to save the settings",
         "placement":"right",
         "onShow":function()         {  
            showDropDown($('.modal div>div>div:eq(1)>div>div>div:eq(0)>div>form>div:eq(1)>div>input'))
         },
         "onNext":function()         {  
            $('.modal div>div>div:eq(0)>button').trigger('click'); var  itemPromise =jQuery.Deferred();setTimeout(function(){var setInt =  setInterval(function(){if( $.active == 0){  setTimeout(function(){itemPromise.resolve()},500);clearInterval(setInt);}},500);},500);return itemPromise;}
      },
      {  
         "element":"li.staticItem + li.tile-item-wraper div.dashIconWrap  a:eq(1)",
         "title":"Edit App",
         "content":"Edit your app here",
         "placement":"right",
         "onShow":function()         {  
            showDropDown($('li.staticItem + li.tile-item-wraper div.dashIconWrap  a:eq(1)'))
         },
         "onNext":function(){var  itemPromise =jQuery.Deferred();setTimeout(function(){var setInt =  setInterval(function(){if( $.active == 0){  setTimeout(function(){itemPromise.resolve()},500);clearInterval(setInt);}},500);},500);return itemPromise;}
      },
      {  
         "element":"li.staticItem + li.tile-item-wraper div.dashIconWrap a:eq(2)",
         "title":"Delete",
         "content":"Delete your app here",
         "placement":"right",
         "onShow":function()         {  
            showDropDown($('li.staticItem + li.tile-item-wraper div.dashIconWrap a:eq(2)'))
         },
         "onNext":function(){var  itemPromise =jQuery.Deferred();setTimeout(function(){var setInt =  setInterval(function(){if( $.active == 0){  setTimeout(function(){itemPromise.resolve()},500);clearInterval(setInt);}},500);},500);return itemPromise;}
      },
      {  
         "element":"li.staticItem + li.tile-item-wraper div.dashIconWrap a:eq(3)",
         "title":"Clone",
         "content":"Clone your app here",
         "placement":"right",
         "onShow":function()         {  
            showDropDown($('li.staticItem + li.tile-item-wraper div.dashIconWrap a:eq(3)'))
         },
         "onNext":function(){var  itemPromise =jQuery.Deferred();setTimeout(function(){var setInt =  setInterval(function(){if( $.active == 0){  setTimeout(function(){itemPromise.resolve()},500);clearInterval(setInt);}},500);},500);return itemPromise;}
      },
      {  
         "element":"li.staticItem + li.tile-item-wraper article>div:eq(1)>ul>li>a",
         "title":"Favorite",
         "content":"Set this app as your favourite",
         "placement":"right",
         "onShow":function()         {  
            showDropDown($('li.staticItem + li.tile-item-wraper article>div:eq(1)>ul>li>a'))
         },
         "onNext":function(){var  itemPromise =jQuery.Deferred();setTimeout(function(){var setInt =  setInterval(function(){if( $.active == 0){  setTimeout(function(){itemPromise.resolve()},500);clearInterval(setInt);}},500);},500);return itemPromise;}
      },
      {  
         "element":"li.staticItem + li.tile-item-wraper article>div:eq(1)>a",
         "title":"App Name",
         "content":"This is your App Container",
         "placement":"right",
         "onShow":function()         {  
            showDropDown($('li.staticItem + li.tile-item-wraper article>div:eq(1)>a'))
         },
         "onNext":function(){var  itemPromise =jQuery.Deferred();setTimeout(function(){var setInt =  setInterval(function(){if( $.active == 0){  setTimeout(function(){itemPromise.resolve()},500);clearInterval(setInt);}},500);},500);return itemPromise;}
      },
	   {  
         "element":"html>body>section>section>div:eq(0)>ul>li:eq(0)>input",
         "title":"Search",
         "content":"Search your Apps here",
         "placement":"right",
         "onShow":function()         {  
            showDropDown($('html>body>section>section>div:eq(0)>ul>li:eq(0)>input'))
         },
         "onNext":function(){var  itemPromise =jQuery.Deferred();setTimeout(function(){var setInt =  setInterval(function(){if( $.active == 0){  setTimeout(function(){itemPromise.resolve()},500);clearInterval(setInt);}},500);},500);return itemPromise;}
      },
      {  
         "element":"html>body>section>section>div:eq(0)>ul>li:eq(3)>a",
         "title":"Toggle View",
         "content":"Toggle to List or Tile view",
         "placement":"right",
         "onShow":function()         {  
            showDropDown($('html>body>section>section>div:eq(0)>ul>li:eq(3)>a'))
         },
         "onNext":function(){var  itemPromise =jQuery.Deferred();setTimeout(function(){var setInt =  setInterval(function(){if( $.active == 0){  setTimeout(function(){itemPromise.resolve()},500);clearInterval(setInt);}},500);},500);return itemPromise;}
      },
      {  
         "element":"body",
         "onShow":function()         {  
            $('.showDrop').removeClass('showDrop');
         },
         "placement":"endScreen",
         "title":"End!",
         "content":"Hope you had fun touring Vizru, thankyou!"
      }
   ];
/* *************************** */
tourArray['livespace_html'] = [  
     {  
         "element":"html>body>section>section>div:eq(0)>div>div>div:eq(0)>a",
         "title":"Upload",
         "content":"Click to upload files",
         "placement":"right",
         "onShow":function()         {  
            showDropDown($('html>body>section>section>div:eq(0)>div>div>div:eq(0)>a'))
         },
         "onNext":function()         {  
           var  itemPromise =jQuery.Deferred();setTimeout(function(){var setInt =  setInterval(function(){if( $.active == 0){  setTimeout(function(){itemPromise.resolve()},500);clearInterval(setInt);}},500);},500);return itemPromise;}
      },
      {  
         "element":"#staticIid article>div:eq(0)>div>ol>li:eq(0)>a",
         "title":"Add Doc",
         "content":"Create Document file.",
         "placement":"left",
         "onShow":function()         {  
            showDropDown($('#staticIid article>div:eq(0)>div>ol>li:eq(0)>a'))
         },
         "onNext":function()         {  
			var  itemPromise =jQuery.Deferred();setTimeout(function(){var setInt =  setInterval(function(){if( $.active == 0){  setTimeout(function(){itemPromise.resolve()},1000);clearInterval(setInt);}},500);},500);return itemPromise;}
      },
      {  
         "element":"#staticIid article>div:eq(0)>div>ol>li:eq(1)>a",
         "title":"Upload File",
         "content":"Click here to upload a file",
         "placement":"left",
         "onShow":function()         {  
            showDropDown($('#staticIid article>div:eq(0)>div>ol>li:eq(1)>a'))
         },
         "onNext":function()         {  
			var  itemPromise =jQuery.Deferred();setTimeout(function(){var setInt =  setInterval(function(){if( $.active == 0){  setTimeout(function(){itemPromise.resolve()},500);clearInterval(setInt);}},500);},500);return itemPromise;}
      },
      {  
         "element":"#staticIid article>div:eq(0)>div>ol>li:eq(2)>a",
         "title":"Create Collection",
         "content":"Click to create collection",
         "placement":"left",
         "onShow":function()         {  
            showDropDown($('#staticIid article>div:eq(0)>div>ol>li:eq(2)>a'))
         },
         "onNext":function()         {  
            $('#staticIid article>div:eq(0)>div>ol>li:eq(2)>a').trigger('click'); 
			var  itemPromise =jQuery.Deferred();setTimeout(function(){var setInt =  setInterval(function(){if( $.active == 0){  setTimeout(function(){itemPromise.resolve()},1000);clearInterval(setInt);}},1000);},1000);return itemPromise;}
      },
      {  
         "element":".modal div>div>div:eq(1)>div>form>div:eq(1)>div>input",
         "title":"Save Collection",
         "content":"Enter collection name and click Save",
         "placement":"right",
         "onShow":function()         {  
            showDropDown($('.modal div>div>div:eq(1)>div>form>div:eq(1)>div>input'))
         },
         "onNext":function()         {  
            $('.modal div>div>div:eq(0)>button').trigger('click'); 
			var  itemPromise =jQuery.Deferred();setTimeout(function(){var setInt =  setInterval(function(){if( $.active == 0){  setTimeout(function(){itemPromise.resolve()},500);clearInterval(setInt);}},500);},500);return itemPromise;}
      },
      {  
         "element":".versionf:first",
         "title":"Version",
         "content":"File Version number",
         "placement":"right",
         "onShow":function()         {  
            showDropDown($('.versionf:first'))
         },
         "onNext":function()         {  
            var  itemPromise =jQuery.Deferred();setTimeout(function(){var setInt =  setInterval(function(){if( $.active == 0){  setTimeout(function(){itemPromise.resolve()},500);clearInterval(setInt);}},500);},500);return itemPromise;}
      }	,
      {  
         "element":".elements_row:first .customCheckBox",
         "title":"Checkbox",
         "content":"Select check box to multi select Files and Collection",
         "placement":"right",
         "onShow":function()         {  
            showDropDown($('.elements_row:first .customCheckBox'))
         },
         "onNext":function()         {  
            $('.elements_row:first .customCheckBox').trigger('click'); 
			var  itemPromise =jQuery.Deferred();setTimeout(function(){var setInt =  setInterval(function(){if( $.active == 0){  setTimeout(function(){itemPromise.resolve()},500);clearInterval(setInt);}},500);},500);return itemPromise;}
      },
      {  
         "element":".showTileAction .tileaction span>div.customCheckBox.selectAll",
         "title":"Select All",
         "content":"Click to select all files and collecton",
         "placement":"right",
         "onShow":function()         {  
            showDropDown($('.showTileAction .tileaction span>div.customCheckBox.selectAll'))
         },
         "onNext":function()         {  
            var  itemPromise =jQuery.Deferred();setTimeout(function(){var setInt =  setInterval(function(){if( $.active == 0){  setTimeout(function(){itemPromise.resolve()},500);clearInterval(setInt);}},500);},500);return itemPromise;}
      },
      {  
         "element":".showTileAction .tileaction span>a.edit_collection.ajax",
         "title":"Edit",
         "content":"Click to edit file or collection",
         "placement":"right",
         "onShow":function()         {  
            showDropDown($('.showTileAction .tileaction span>a.edit_collection.ajax'))
         },
         "onNext":function()         {  
			var  itemPromise =jQuery.Deferred();setTimeout(function(){var setInt =  setInterval(function(){if( $.active == 0){  setTimeout(function(){itemPromise.resolve()},1000);clearInterval(setInt);}},1000);},1000);return itemPromise;}
      },
      {  
         "element":".showTileAction .tileaction span>a.add-to-tag",
         "title":"Set Tag",
         "content":"Click to tag a file",
         "placement":"right",
         "onShow":function()         {  
            showDropDown($('.showTileAction .tileaction span>a.add-to-tag'))
         },
         "onNext":function()         {  
            $('.showTileAction .tileaction span>a.add-to-tag').trigger('click'); 
			var  itemPromise =jQuery.Deferred();setTimeout(function(){var setInt =  setInterval(function(){if( $.active == 0){  setTimeout(function(){itemPromise.resolve()},500);clearInterval(setInt);}},500);},500);return itemPromise;}
      },
      {  
         "element":".ui-dialog div:eq(10)>div>button:eq(0)",
         "title":"Add to tag",
         "content":"Select a tag or enter a new tag name and click save",
         "placement":"left",
         "onShow":function()         {  
            showDropDown($('.ui-dialog div:eq(10)>div>button:eq(0)'))
         },
         "onNext":function()         {  
            $('.ui-dialog div:eq(0)>a').trigger('click'); 
			var  itemPromise =jQuery.Deferred();setTimeout(function(){var setInt =  setInterval(function(){if( $.active == 0){  setTimeout(function(){itemPromise.resolve()},500);clearInterval(setInt);}},500);},500);return itemPromise;}
      },
      {  
         "element":".showTileAction .tileaction span>a.move_to_collection",
         "title":"Move To Collection",
         "content":"Move a file to a collection",
         "placement":"right",
         "onShow":function()         {  
            showDropDown($('.showTileAction .tileaction span>a.move_to_collection'))
         },
         "onNext":function()         {  
            $('.showTileAction .tileaction span>a.move_to_collection').trigger('click');
			var  itemPromise =jQuery.Deferred();setTimeout(function(){var setInt =  setInterval(function(){if( $.active == 0){  setTimeout(function(){itemPromise.resolve()},500);clearInterval(setInt);}},500);},500);return itemPromise;}
      },
      {  
         "element":".ui-dialog div:eq(10)>div>button:eq(0)",
         "title":"Move Collection",
         "content":"Select the collection name from the dropdown and click Save",
         "placement":"left",
         "onShow":function()         {  
            showDropDown($('.ui-dialog div:eq(10)>div>button:eq(0)'))
         },
         "onNext":function()         {  
            $('.ui-dialog div:eq(0)>a').trigger('click'); 
			var  itemPromise =jQuery.Deferred();setTimeout(function(){var setInt =  setInterval(function(){if( $.active == 0){  setTimeout(function(){itemPromise.resolve()},500);clearInterval(setInt);}},500);},500);return itemPromise;}
      },
      {  
         "element":".showTileAction .tileaction span>a.download",
         "title":"download",
         "content":"Click to download ",
         "placement":"right",
         "onShow":function()         {  
            showDropDown($('.showTileAction .tileaction span>a.download'))
         },
         "onNext":function()         {  
            {var  itemPromise =jQuery.Deferred();setTimeout(function(){var setInt =  setInterval(function(){if( $.active == 0){  setTimeout(function(){itemPromise.resolve()},500);clearInterval(setInt);}},500);},500);return itemPromise;}}
      },
      {  
         "element":".showTileAction .tileaction span>a.trash",
         "title":"Delete",
         "content":"Delete file or collection.",
         "placement":"right",
         "onShow":function()         {  
            showDropDown($('.showTileAction .tileaction span>a.trash'))
         },
         "onNext":function()         {  
            {var  itemPromise =jQuery.Deferred();setTimeout(function(){var setInt =  setInterval(function(){if( $.active == 0){  setTimeout(function(){itemPromise.resolve()},500);clearInterval(setInt);}},500);},500);return itemPromise;}}
      },
      {  
         "element":"html>body>section>div:eq(0)>div>aside>section>div>ul>li:eq(0)>a",
         "title":"Tags Section",
         "content":"All tags will be listed here",
         "placement":"left",
         "onShow":function()         {  
            showDropDown($('html>body>section>div:eq(0)>div>aside>section>div>ul>li:eq(0)>a'))
         },
         "onNext":function()         {  
            {var  itemPromise =jQuery.Deferred();setTimeout(function(){var setInt =  setInterval(function(){if( $.active == 0){  setTimeout(function(){itemPromise.resolve()},500);clearInterval(setInt);}},500);},500);return itemPromise;}}
      },
      {  
         "element":"html>body>section>div:eq(0)>div>aside>section>div>div>article:eq(0)>div:eq(0)>a:eq(1)",
         "title":"create Tag",
         "content":"Click to create tag",
         "placement":"left",
         "onShow":function()         {  
            showDropDown($('html>body>section>div:eq(0)>div>aside>section>div>div>article:eq(0)>div:eq(0)>a:eq(1)'))
         },
         "onNext":function()         {  
            {var  itemPromise =jQuery.Deferred();setTimeout(function(){var setInt =  setInterval(function(){if( $.active == 0){  setTimeout(function(){itemPromise.resolve()},500);clearInterval(setInt);}},500);},500);return itemPromise;}}
      },
      {  
         "element":"html>body>section>div:eq(0)>div>aside>section>div>div>article:eq(0)>div:eq(0)>a:eq(0)",
         "title":"clear all ",
         "content":"Clear all tags",
         "placement":"left",
         "onShow":function()         {  
            showDropDown($('html>body>section>div:eq(0)>div>aside>section>div>div>article:eq(0)>div:eq(0)>a:eq(0)'))
         },
         "onNext":function()         {  
            {var  itemPromise =jQuery.Deferred();setTimeout(function(){var setInt =  setInterval(function(){if( $.active == 0){  setTimeout(function(){itemPromise.resolve()},500);clearInterval(setInt);}},500);},500);return itemPromise;}}
      },
      {  
         "element":"html>body>section>section>div:eq(1)>ul>li:eq(3)>div>ul>li:eq(0)>a",
         "title":"Dropdown",
         "content":"move to files and templates section.",
         "placement":"left",
         "onShow":function()         {  
            showDropDown($('html>body>section>section>div:eq(1)>ul>li:eq(3)>div>ul>li:eq(0)>a'))
         },
         "onNext":function()         {  
            {var  itemPromise =jQuery.Deferred();setTimeout(function(){var setInt =  setInterval(function(){if( $.active == 0){  setTimeout(function(){itemPromise.resolve()},500);clearInterval(setInt);}},500);},500);return itemPromise;}}
      },
      {  
         "element":"html>body>section>section>div:eq(1)>ul>li:eq(2)>div>ul>ol>li:eq(1)>a",
         "title":"Create shortcut",
         "content":"Click here to create shortcut",
         "placement":"left",
         "onShow":function()         {  
            showDropDown($('html>body>section>section>div:eq(1)>ul>li:eq(2)>div>ul>ol>li:eq(1)>a'))
         },
         "onNext":function()         {  
            $('html>body>section>section>div:eq(1)>ul>li:eq(2)>div>ul>ol>li:eq(1)>a').trigger('click'); var  itemPromise =jQuery.Deferred();setTimeout(function(){var setInt =  setInterval(function(){if( $.active == 0){  setTimeout(function(){itemPromise.resolve()},500);clearInterval(setInt);}},500);},500);return itemPromise;}
      },
      {  
         "element":".modal div>div>div:eq(1)>div>div>form>div:eq(3)>div>input",
         "title":"Shortcut",
         "content":"Enter shortcut details and click submit",
         "placement":"right",
         "onShow":function()         {  
            showDropDown($('.modal div>div>div:eq(1)>div>div>form>div:eq(3)>div>input'))
         },
         "onNext":function()         {  
            $('.modal div>div>div:eq(0)>button').trigger('click');
				var  itemPromise =jQuery.Deferred();setTimeout(function(){var setInt =  setInterval(function(){if( $.active == 0){  setTimeout(function(){itemPromise.resolve()},500);clearInterval(setInt);}},500);},500);return itemPromise;}
      } /*,{  // messages icon commented 
         "element":"a#messageToggle",
         "title":"messages",
         "content":"click to show messages",
         "placement":"left",
         "onShow":function()         {  
            showDropDown($('a#messageToggle'))
         },
         "onNext":function()         {  
            $('a#messageToggle').trigger('click');
         }
      },
      {  
         "element":"textarea#add_broadcast_fld",
         "title":"textarea",
         "content":"type your messages here.",
         "placement":"left",
         "onShow":function()         {  
            showDropDown($('textarea#add_broadcast_fld'))
         },
		 "onNext":function()         {  
            {var  itemPromise =jQuery.Deferred();setTimeout(function(){var setInt =  setInterval(function(){if( $.active == 0){  setTimeout(function(){itemPromise.resolve()},500);clearInterval(setInt);}},500);},500);return itemPromise;}}
      }*/,{  
         "element":"body",
         "onShow":function()         {  
            $('.showDrop').removeClass('showDrop');
         },
         "placement":"endScreen",
         "title":"End!",
         "content":"Thanks for viewing this tour !"
      }
   ];
/*****   */
tourArray['users_html'] = [  
      {  
         "element":"#staticIid article>div:eq(0)>div>a",
         "title":"Add members",
         "content":"Click to add members",
         "placement":"left",
         "onShow":function()         {  
            showDropDown($('#staticIid article>div:eq(0)>div>a'))
         },
         "onNext":function()         {  
            $('#staticIid article>div:eq(0)>div>a').trigger('click'); var  itemPromise =jQuery.Deferred();setTimeout(function(){var setInt =  setInterval(function(){if( $.active == 0){  setTimeout(function(){itemPromise.resolve()},500);clearInterval(setInt);}},500);},500);return itemPromise;
         }
      },
      {  
         "element":".modal div>div>div:eq(1)>div>div:eq(1)>div>table>tbody>tr:eq(0)>td:eq(0)>span",
         "title":"Select user",
         "content":"Select the users ",
         "placement":"right",
         "onShow":function()         {  
            showDropDown($('.modal div>div>div:eq(1)>div>div:eq(1)>div>table>tbody>tr:eq(0)>td:eq(0)>span'))
         },
         "onNext":function()         {  
            var  itemPromise =jQuery.Deferred();setTimeout(function(){var setInt =  setInterval(function(){if( $.active == 0){  setTimeout(function(){itemPromise.resolve()},500);clearInterval(setInt);}},500);},500);return itemPromise;
         }
      },
      {  
         "element":".modal .relative .MLIcons",
         "title":"Assign Role",
         "content":"Activate App-role for the selected users",
         "placement":"right",
         "onShow":function()         {  
            showDropDown($('.modal div>div>div:eq(1)>div>div:eq(0)>span>div>a'))
         },
         "onNext":function()         {  
            $('.modal div>div>div:eq(0)>button').trigger('click'); var  itemPromise =jQuery.Deferred();setTimeout(function(){var setInt =  setInterval(function(){if( $.active == 0){  setTimeout(function(){itemPromise.resolve()},500);clearInterval(setInt);}},500);},500);return itemPromise;
         }
      },
      {  
         "element":"li.showListBtn:first .customCheckBox",
         "title":"Edit user",
         "content":"Click to edit user",
         "placement":"right",
         "onShow":function()         {  
            showDropDown($('li.showListBtn:first .customCheckBox'))
         },
         "onNext":function()         { 
		 	$('li.showListBtn:first .customCheckBox').trigger("click") ;
           var  itemPromise =jQuery.Deferred();setTimeout(function(){var setInt =  setInterval(function(){if( $.active == 0){  setTimeout(function(){itemPromise.resolve()},500);clearInterval(setInt);}},500);},500);return itemPromise;
         }
      },
      {  
         "element":".showTileAction .tileaction span>div:eq(1)>a",
         "title":"Change role",
         "content":"Change app role",
         "placement":"right",
         "onShow":function()         {  
            showDropDown($('.showTileAction .tileaction span>div:eq(1)>a'))
         },
         "onNext":function()         {  
           var  itemPromise =jQuery.Deferred();setTimeout(function(){var setInt =  setInterval(function(){if( $.active == 0){  setTimeout(function(){itemPromise.resolve()},500);clearInterval(setInt);}},500);},500);return itemPromise;
         }
      },
      {  
         "element":".showTileAction .tileaction span>div:eq(2)>a.MLIcons",
         "title":"Set Landing",
         "content":"For selected users you can set default landing page as Dashboard or this App",
         "placement":"right",
         "onShow":function()         {  
            showDropDown($('.showTileAction .tileaction span>div:eq(2)>a.MLIcons'))
         },
         "onNext":function()         {  
            var  itemPromise =jQuery.Deferred();setTimeout(function(){var setInt =  setInterval(function(){if( $.active == 0){  setTimeout(function(){itemPromise.resolve()},500);clearInterval(setInt);}},500);},500);return itemPromise;
         }
      },
      {  
         "element":".showTileAction .tileaction span>a.MLIcons",
         "title":"Inactivate",
         "content":"Inactive member from this app",
         "placement":"right",
         "onShow":function()         {  
            showDropDown($('.showTileAction .tileaction span>a.MLIcons'))
         },
         "onNext":function()         {  
           var  itemPromise =jQuery.Deferred();setTimeout(function(){var setInt =  setInterval(function(){if( $.active == 0){  setTimeout(function(){itemPromise.resolve()},500);clearInterval(setInt);}},500);},500);return itemPromise;
         }
      },
      {  
         "element":"body",
         "onShow":function()         {  
            $('.showDrop').removeClass('showDrop');
         },
         "placement":"endScreen",
         "title":"End!",
         "content":"Thanks for viewing this tour !"
      }
   ];

/* *************************** */
tourArray['livespace_html_templates'] = [  
      {  
         "element":"#staticIid article>div:eq(0)>div>ol>li:eq(0)>a",
         "title":"Add Spreadsheet",
         "content":"Click to add spreadsheet.",
         "placement":"right",
         "onShow":function()         {  
            showDropDown($('#staticIid article>div:eq(0)>div>ol>li:eq(0)>a'))
         },
         "onNext":function()         {  
           var  itemPromise =jQuery.Deferred();setTimeout(function(){var setInt =  setInterval(function(){if( $.active == 0){  setTimeout(function(){itemPromise.resolve()},500);clearInterval(setInt);}},500);},500);return itemPromise;}
      },
      {  
         "element":"#staticIid article>div:eq(0)>div>ol>li:eq(1)>a",
         "title":"Create new grid",
         "content":"click to add a new gird",
         "placement":"left",
         "onShow":function()         {  
            showDropDown($('#staticIid article>div:eq(0)>div>ol>li:eq(1)>a'))
         },
         "onNext":function()         {  
           var  itemPromise =jQuery.Deferred();setTimeout(function(){var setInt =  setInterval(function(){if( $.active == 0){  setTimeout(function(){itemPromise.resolve()},500);clearInterval(setInt);}},500);},500);return itemPromise;}
      },
      {  
         "element":"#staticIid article>div:eq(0)>div>ol>li:eq(2)>a",
         "title":"create new chart",
         "content":"click to create new chart",
         "placement":"left",
         "onShow":function()         {  
            showDropDown($('#staticIid article>div:eq(0)>div>ol>li:eq(2)>a'))
         },
         "onNext":function()         {  
            $('#staticIid article>div:eq(0)>div>ol>li:eq(2)>a').trigger('click');
			var  itemPromise =jQuery.Deferred();setTimeout(function(){var setInt =  setInterval(function(){if( $.active == 0){  setTimeout(function(){itemPromise.resolve()},500);clearInterval(setInt);}},500);},500);return itemPromise;}
      },
      {  
         "element":".modal div>div>div:eq(1)>div:eq(1)>div>div:eq(0)>select",
         "title":"select db object",
         "content":"Select the source",
         "placement":"right",
         "onShow":function()         {  
            showDropDown($('.modal div>div>div:eq(1)>div:eq(1)>div>div:eq(0)>select'))
         },
         "onNext":function()         {  
           var  itemPromise =jQuery.Deferred();setTimeout(function(){var setInt =  setInterval(function(){if( $.active == 0){  setTimeout(function(){itemPromise.resolve()},500);clearInterval(setInt);}},500);},500);return itemPromise;}
      },
      {  
         "element":".modal div>div>div:eq(1)>div:eq(1)>div>div:eq(1)>input",
         "title":"chart name",
         "content":"click to enter chart name",
         "placement":"right",
         "onShow":function()         {  
            showDropDown($('.modal div>div>div:eq(1)>div:eq(1)>div>div:eq(1)>input'))
         },
         "onNext":function()         {  
           var  itemPromise =jQuery.Deferred();setTimeout(function(){var setInt =  setInterval(function(){if( $.active == 0){  setTimeout(function(){itemPromise.resolve()},500);clearInterval(setInt);}},500);},500);return itemPromise;}
      },
      {  
         "element":".modal div>div>div:eq(1)>div:eq(1)>div>div:eq(4)>a",
         "title":"save",
         "content":"Click save to generate chart.",
         "placement":"left",
         "onShow":function()         {  
            showDropDown($('.modal div>div>div:eq(1)>div:eq(1)>div>div:eq(4)>a'))
         },
         "onNext":function()         {  
            $('.modal div>div>div:eq(0)>button').trigger('click');
			var  itemPromise =jQuery.Deferred();setTimeout(function(){var setInt =  setInterval(function(){if( $.active == 0){  setTimeout(function(){itemPromise.resolve()},500);clearInterval(setInt);}},500);},500);return itemPromise;}
      },
      {  
         "element":"#staticIid article>div:eq(0)>div>ol>li:eq(3)>a",
         "title":"create collection",
         "content":"click to create collection",
         "placement":"left",
         "onShow":function()         {  
            showDropDown($('#staticIid article>div:eq(0)>div>ol>li:eq(3)>a'))
         },
         "onNext":function()         {  
           var  itemPromise =jQuery.Deferred();setTimeout(function(){var setInt =  setInterval(function(){if( $.active == 0){  setTimeout(function(){itemPromise.resolve()},500);clearInterval(setInt);}},500);},500);return itemPromise;}
      },
      {  
         "element":"body",
         "onShow":function()         {  
            $('.showDrop').removeClass('showDrop');
         },
         "placement":"endScreen",
         "title":"End!",
         "content":"Thanks for viewing this tour !"
      }
   ];

/* *************************** */
tourArray['liveapps_html'] = [  
      {  
         "element":"#null article>div:eq(0)>div>a",
         "title":"create new dashboard",
         "content":"click to create new dashboard",
         "placement":"right",
         "onShow":function()         {  
            showDropDown($('#null article>div:eq(0)>div>a'))
         },
          "onNext":function(){var  itemPromise =jQuery.Deferred();setTimeout(function(){var setInt =  setInterval(function(){if( $.active == 0){  setTimeout(function(){itemPromise.resolve()},500);clearInterval(setInt);}},500);},500);return itemPromise;}
      },
      {  
         "element":"li.staticItem + li.tile-item-wraper .dataCheck",
         "title":"select",
         "content":"click to select dashboard",
         "placement":"right",
         "onShow":function()         {  
            showDropDown($('li.staticItem + li.tile-item-wraper .dataCheck'))
         },
         "onNext":function()         {  
            $('li.staticItem + li.tile-item-wraper .dataCheck').trigger('click'); 
			var  itemPromise =jQuery.Deferred();setTimeout(function()            {  
               var setInt =  setInterval(function()               {  
                  if( $.active == 0 )                  {  
                     setTimeout(function()                     {  
                        itemPromise.resolve()
                     },
                     500                     );clearInterval(setInt);
                  }
               },
               500               );
            },
            500            );return itemPromise;
         }
      },
      {  
         "element":".showTileAction .tileaction span>a:eq(0)",
         "title":"set as landing",
         "content":"click to set as landing page",
         "placement":"right",
         "onShow":function()         {  
            showDropDown($('.showTileAction .tileaction span>a:eq(0)'))
         },
          "onNext":function(){var  itemPromise =jQuery.Deferred();setTimeout(function(){var setInt =  setInterval(function(){if( $.active == 0){  setTimeout(function(){itemPromise.resolve()},500);clearInterval(setInt);}},500);},500);return itemPromise;}
      },
      {  
         "element":"li.staticItem + li.tile-item-wraper .dashboard_edit",
         "title":"edit ",
         "content":"click to go to edit dashboard page",
         "placement":"right",
         "onShow":function()         {  
            showDropDown($('li.staticItem + li.tile-item-wraper .dashboard_edit'))
         },
          "onNext":function(){var  itemPromise =jQuery.Deferred();setTimeout(function(){var setInt =  setInterval(function(){if( $.active == 0){  setTimeout(function(){itemPromise.resolve()},500);clearInterval(setInt);}},500);},500);return itemPromise;}
      },
      {  
         "element":"li.staticItem + li.tile-item-wraper .trash",
         "title":"delete",
         "content":"click to delete dashboard",
         "placement":"right",
         "onShow":function()         {  
            showDropDown($('li.staticItem + li.tile-item-wraper .trash'))
         },
          "onNext":function(){var  itemPromise =jQuery.Deferred();setTimeout(function(){var setInt =  setInterval(function(){if( $.active == 0){  setTimeout(function(){itemPromise.resolve()},500);clearInterval(setInt);}},500);},500);return itemPromise;}
      },
      {  
         "element":"li.staticItem + li.tile-item-wraper article>div:eq(1)>ul>li:eq(1)>a",
         "title":"favourite",
         "content":"click to set dashboard as favorite ",
         "placement":"right",
         "onShow":function()         {  
            showDropDown($('li.staticItem + li.tile-item-wraper article>div:eq(1)>ul>li:eq(1)>a'))
         },
          "onNext":function(){var  itemPromise =jQuery.Deferred();setTimeout(function(){var setInt =  setInterval(function(){if( $.active == 0){  setTimeout(function(){itemPromise.resolve()},500);clearInterval(setInt);}},500);},500);return itemPromise;}
      },
	  {  
         "element":".rep-unplugfrmdash",
         "title":"remove landing",
         "content":"remove default set landing page",
         "placement":"right",
         "onShow":function()         {  
            showDropDown($('.rep-unplugfrmdash'))
         },
          "onNext":function(){var  itemPromise =jQuery.Deferred();setTimeout(function(){var setInt =  setInterval(function(){if( $.active == 0){  setTimeout(function(){itemPromise.resolve()},500);clearInterval(setInt);}},500);},500);return itemPromise;}
      },
      {  
         "element":"body",
         "onShow":function()         {  
            $('.showDrop').removeClass('showDrop');
         },
         "placement":"endScreen",
         "title":"End!",
         "content":"Thanks for viewing this tour !"
      }
   ];
   
   