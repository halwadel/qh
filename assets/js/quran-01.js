$(document).ready(function() {

  // var inputSura = "",
  //   slug_value = "",
  //   aya_name = "",
  //   SelectName = ["inputSura", "inputAya"];
  // for (var n = 0, el_label = ""; n < SelectName.length; n++) {
  //   el_label +=
  //     '<label class="select"><select name="' +
  //     SelectName[n] +
  //     '" id="' +
  //     SelectName[n] +
  //     '" class="form-control"></select></label>';
  // }
  // $(el_label).appendTo($("<div/>", { class: "row" }).appendTo("#selectSura"));


  // for (var i = 0; i < lang_id.length; i++) {
  //   var isLang = lang_id[i] == html_lang ? true : false;
  //   inputLang +=
  //     '<option data-lang-id="' +
  //     lang_id[i] +
  //     '" ' +
  //     (isLang ? "selected " : "") +
  //     'value="' +
  //     (i + 1) +
  //     '">' +
  //     lang_id[i].toUpperCase() +
  //     "</option>";
  // }
  $.ajax({
    dataType: "json",
    url: "/surah_lists.json",
    success: function (data) {
      console.log(data.surah);
      var html_markup = "", sura_dir="", slug_value="";

      for (var sura_num = 0; sura_num < data.surah.length; sura_num++) {
        var key_id = sura_num + 1, selectedSurah = "";

        if(data.surah[sura_num].name == quranId.surah_select) {
            var selectedSurah = "selected", ayah_markup = "";

            $.each(data.surah[sura_num].ayah, function (key, value) {
              var key_idAya = key + 1, selectedAyah = "";

              if(key_idAya == quranId.ayah_num) {
                selectedAyah = "selected";
              } 
              ayah_markup +=
                '<option data-num="' +
                key_idAya + '" ' +
                selectedAyah +
                ' value="' +
                value.url +
                '">' +
                "Ayat " + key_idAya +
                "</option>";  
            });

            $("#inputAya").append(ayah_markup);
        }
        html_markup +=
          '<option data-num="' +
          key_id + '" ' +
          selectedSurah +
          ' value="' +
          data.surah[sura_num].name +
          '">' +
          data.surah[sura_num].name +
          "</option>";
      };
      $("#inputSura").append(html_markup);
      
      $("#inputSura").removeAttr("disabled");
      $("#inputAya").removeAttr("disabled");
    },
  });
  function load_json(isSelected = true) {
    
  }
  load_json();
  // function load_sura(slug, count, value, sura_lang, isSinglePage) {
  //   switch (sura_lang) {
  //     case "id":
  //       aya_name = "ayat";
  //       break;
  //     case "ar":
  //       aya_name = "aya";
  //       break;
  //     case "en":
  //     case "hi":
  //     case "ru":
  //     case "ta":
  //       aya_name = "verse";
  //       break;
  //     default:
  //       aya_name = "ayah";
  //   }
  //   var sura_count = parseInt(count),
  //     sura_markup = "";
  //   if (number_aya == 0) {
  //     sura_markup += '<option value="0" selected>Select</option>';
  //   }
  //   for (var sura_item = 0; sura_item < sura_count; sura_item++) {
  //     sura_value = sura_item + 1;
  //     sura_markup +=
  //       "<option " +
  //       (sura_value == number_aya && isSinglePage
  //         ? 'selected="selected"'
  //         : "") +
  //       ' data-uri="/' +
  //       sura_lang +
  //       "/" +
  //       value +
  //       "-" +
  //       slug +
  //       "/" +
  //       aya_name +
  //       "-" +
  //       sura_value +
  //       '/" value="' +
  //       sura_value +
  //       '">' +
  //       sura_value +
  //       "</option>";
  //   }
  //   $("#inputAya").append(sura_markup);
  // }
  // $("#inputLang").on("change", function () {
  //   var f_lang = $(this).find(":selected"),
  //     slug_lang = $(f_lang).attr("data-lang-id");
  //   $("#inputSura").html('<option value="0" selected>Select</option>');
  //   $("#inputAya").html('<option value="0" selected>Select</option>');
  //   load_json(slug_lang, false);
  // });
  $("#inputSura").on("change", function () {
    var s_sura = $(this).find(":selected"),
      slug = $(s_sura).attr("data-sura-slug"),
      count = $(s_sura).attr("data-sura-count"),
      value = $(s_sura).attr("value"),
      sura_lang = $(s_sura).attr("data-lang");
    if (page_type == "surah_home") {
      $("#inputAya").html("");
    } else {
      $("#inputAya").html('<option value="0" selected>Select</option>');
    }
    load_sura(slug, count, value, sura_lang, false);
    return false;
  });
  // $("#inputAya").on("change", function () {
  //   var url = $("option:selected", this).attr("data-uri");
  //   if (url) {
  //     window.location = url;
  //   }
  //   return false;
  // });
  // load_json(html_lang, true);
  // load_sura(sura_dir, count_ayat, sura_id, html_lang, true);
});