$(document).ready(function() {

  function loadJson(surahNumber = 0, selectAyah = 0) {
    $.ajax({
      dataType: "json",
      url: "/surah_lists.json",
      success: function (data) {
        var html_markup = "";

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

              $("#inputAya").append(ayah_markup).prepend('<option value>Pilih ayah</option>');
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
        $("#inputSura").append(html_markup).prepend('<option value>Pilih surah</option>');
        
        $("#inputSura").removeAttr("disabled");
        $("#inputAya").removeAttr("disabled");
      },
    });  
  }
  loadJson();

  function loadAyah(surahSelect, ayahSelect = "") {
    $.ajax({
      dataType: "json",
      url: "/surah_lists.json",
      success: function (data) {
        var ayah_markup = "", optSelect = "<option selected value>Pilih Ayat</option>";
        $.each(data.surah, function (key, value) {
          if(value.name == surahSelect) {
            $.each(value.ayah, function (idx, val) {

              if(val.num == ayahSelect) {
                ayahSelect = "selected";
                optSelect = "<option value>Pilih Ayat</option>";
              } 

              ayah_markup +=
                '<option data-num="' +
                val.num + '" ' +
                ayahSelect +
                ' value="' +
                val.url +
                '">' +
                "Ayat " + val.num +
                "</option>";  
            });

            $("#inputAya").html("").append(ayah_markup).prepend(optSelect);
          }

        });

        
      },
    });  
  }

  $("#inputSura").on("change", function () {
    var surahSelect = $("option:selected", this).val();
    loadAyah(surahSelect);
  });

  $("#inputAya").on("change", function () {
    var url = $("option:selected", this).val();
    if (url) {
      window.location = url;
    }
    return false;
  });

  document.getElementById("copyrighYear").innerHTML = new Date().getFullYear();

});