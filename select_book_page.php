<?php
    require  'config.php';
	$_pre=($_POST['page']-1)*10;
	$_next=$_POST['page']*10;
    $query = mysql_query("SELECT * FROM book_msg limit $_pre,$_next") or die('SQL错误');
	
	$json='';
	
	while(!!$row=mysql_fetch_array($query, MYSQL_ASSOC))
	{
		foreach($row as $key=>$value)
		{
			$row[$key]=urlencode(str_replace("\n","",$value));
		}
		$json.=urldecode(json_encode($row)).',';
	}
	
	echo '['.substr($json,0,strlen($json)-1).']';
	
    mysql_close();
?>