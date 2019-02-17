<?php
    require  'config.php';
	
	$_pass =sha1($_POST['pass']);
    $query = mysql_query("SELECT user, pass FROM user_msg WHERE user='{$_POST['user']}'  AND pass='{$_POST['pass']}'") or die('SQL错误');
	
	
	if(mysql_fetch_array($query, MYSQL_ASSOC))
	{
	echo 'true';
	}
	else
	{
	echo 'false';
	}
     mysql_close();
?>