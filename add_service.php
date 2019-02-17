<?php
    require  'config.php';
	
	$_pass =sha1($_POST['pass']);
    $query = "INSERT INTO service_msg(user,service_num,service_msg,date)
              VALUES('{$_POST['user']}','{$_POST['service_num']}','{$_POST['service_msg']}',NOW())";
			  
			  
     mysql_query($query) or die('新增失败' .mysql_error());
     echo mysql_affected_rows();
     mysql_close();
?>