$(document).ready(function(){
  $("#clear").click(function(){
    on_clear_clicked();
  });

  $("#clear_entry").click(function(){
    on_clear_entry_clicked();
  });

  $("#calculate").click(function(){
    on_calculate_clicked();
  });

  $(".operator").click(function(event){
    on_operator_clicked(event);
  });

  $(".value").click(function(event){
    on_value_clicked(event);
  });
});
