<?php
       header('Content-Type:text/html;charset=utf-8');

       define('DB_HOST','localhost');
       define('DB_USER','root');
       define('DB_PWD','root');
       define('DB_NAME','book');

       $conn = @mysql_connect(DB_HOST, DB_USER, DB_PWD) or die('���ݿ�����ʧ��');
      @mysql_select_db(DB_NAME) or die('���ݿ����:' .mysql_error());
      @mysql_query('SET NAMES UTF8') or die('�ַ�������:' .mysql_error());
?>