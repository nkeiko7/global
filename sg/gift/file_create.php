<?php
/* ------------------------------------------------------
　○Global GIFT キャンペーンページ
　	テンプレートhtmlとcsvファイルを読み込んで結果を表示する。
	
　○ファイル名
　	・テンプレートファイル名：gift_format.html
　	・CSVファイル名：gift.csv
　	
　○CSVフォーマット
　	・1カラム目：画像URL
　　・2カラム目：商品説明
　　・3カラム目：商品名
　　・4カラム目：リンクURL
　　・5カラム目：価格
	
	2014/11/13 t.nakagawa
------------------------------------------------------*/
//ファイル名定義
$template_file = "gift_format.html";
$csv_file = "gift.csv";
$file_name = "index.html";

$file_temp = "";

//ファイル作成後に表示する画面
$result_menu = <<<MENU
	<!DOCTYPE html>
	<!--[if IE 8]><html class="ie8"><![endif]-->
	<html>
	<head>
		<meta charset="UTF-8">
		
		<title>GIFT CAMPAIGN CREATE | MUJI</title>
	</head>
	<body>
		<p>index.html created!</p>
	</body>
	</html>
MENU;


//テンプレートファイルの存在確認
if (file_exists($template_file)){
	//テンプレート読み込み
	$file_temp = file_get_contents($template_file);
	
	//テンプレートの読み込みに失敗したらエラー表示して終了
	if ($file_temp == FALSE){
		echo "format html error";
		exit;
	}
	
//テンプレートファイルがないのでエラーを表示して終了
} else {
	echo "format html not exists";
	exit;
}


//CSVの存在確認
if (file_exists($csv_file)){
	
	$img = "";
	$description = "";
	$item_name = "";
	$url = "";
	$price = "";
	
	$html_temp = "";
	$csv_count = 1;
	
	//CSVをオープンしてロックする
	$csv_fp = fopen($csv_file, 'r');
	flock($csv_fp, LOCK_EX);
	
	//CSVを1行づつ読み込む
	while($csv_data = fgetcsv($csv_fp)){
		
		$img = $csv_data[0];
		$description = $csv_data[1];
		$item_name = $csv_data[2];
		$url = $csv_data[3];
		$price = $csv_data[4];
		
		//画像URLがある時のみ
		//if ($csv_data[0] != ""){
		if ($img != ""){
			
			//CSVが最初の行でなければ閉じタグを追記
			if ($csv_count !== 1){
				$html_temp .= "				</p>\n";
				$html_temp .= "			</div>\n";
				$html_temp .= "		</div>\n";
			}
			
			$html_temp .= "		<div class=\"item\">\n";
			$html_temp .= "			<img src=\"" . $img . "\">\n";
			
			//説明文がある時のみ
			if ($description != ""){ 
				$html_temp .= "			<p class=\"detail\">" . $description . "</p>\n";
			}
			
			$html_temp .= "			\n";
			$html_temp .= "			<div class=\"misc\">\n";
			$html_temp .= "				<p class=\"detail\">\n";
		}
		
		//URLがある時のみ
		if ($url != ""){
			$html_temp .= "					<a href=\"" . $url . "\">\n";
		}
		
		$html_temp .= "						<span class=\"name\">" . $item_name . "</span>\n";
		
		//価格がある時のみ
		if ($price != ""){
			$html_temp .= "						<span class=\"price\">$<span class=\"num\">" . $price . "</span></span>\n";
		}
		//URLがある時のみ
		if ($url != ""){
			$html_temp .= "					</a>\n";
		}
		
		//変数初期化
		$description = "";
		$item_name = "";
		$url = "";
		$price = "";
		
		//csv数のカウントアップ
		$csv_count++;
	}
	
	//最終データに閉じタグを加える。
	$html_temp .= "				</p>\n";
	$html_temp .= "			</div>\n";
	$html_temp .= "		</div>\n";
	
	
	//フォーマットの差し込み箇所を置換
	$file_temp = str_replace("<div id=\"insert_csv_data\"><div>", $html_temp, $file_temp);
	//コメント削除
	$file_temp = str_replace("<!-- ここにCSVのデータを差し込む -->", "", $file_temp);
	
	//CSVクローズ
	fclose($csv_fp);
	
	//既存ファイルの削除
	if (file_exists($file_name)){
		unlink($file_name);
	}
	//htmlファイル作成
	touch($file_name);
	//権限変更
	chmod($file_name, 0755);
	
	$file_fp = fopen($file_name, "w");
	fwrite($file_fp, $file_temp);
	fclose($file_fp);
	
	//完了画面表示
	//echo $result_menu;
	echo $file_temp;
	
//CSVファイルがないのでエラーを表示して終了
} else {
	echo "data csv not exists";
	exit;
}


?>