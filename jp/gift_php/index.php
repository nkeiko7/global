<?php
/* ------------------------------------------------------
　○Global GIFT キャンペーンページ
　	テンプレートhtmlとcsvファイルを読み込んで結果を表示する。
　
　○ファイル名
　	・テンプレートファイル名：gift_format.html
　	・CSVファイル名：gift.csv
　	
　○CSVフォーマット
　	・1カラム目：画像URL
　　・2カラム目：リンクURL
　　・3カラム目：商品名
　　・4カラム目：発売予定日
　
2014/11/11 t.nakagawa
------------------------------------------------------*/
//ファイル名定義
$template_file = "gift_format.html";
$csv_file = "gift.csv";

$file_temp = "";
$result_file = "";

//テンプレート読み込み
if (file_exists($template_file)){
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


//CSV読み込み
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
	
	//BOMチェック関数呼び出し
	//$csv_fp = bomcheck($csv_fp);
	
	//CSVを1行づつ読み込む
	while($csv_data = fgetcsv($csv_fp)){
		
		$description = $csv_data[1];
		$item_name = $csv_data[2];
		$url = $csv_data[3];
		$price = $csv_data[4];
		
		if ($csv_data[0] != ""){
			$img = $csv_data[0];
			
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
			$html_temp .= "						<span class=\"price\">税込<span class=\"num\">" . $price . "</span>円</span>\n";
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
		
		$csv_count++;
	}
	
	$html_temp .= "				</p>\n";
	$html_temp .= "			</div>\n";
	$html_temp .= "		</div>\n";
	
	
	//フォーマットの差し込み箇所を置換
	$result_file = str_replace("<div id=\"insert_csv_data\"><div>", $html_temp, $file_temp);
	//コメント削除
	$result_file = str_replace("<!-- ここにCSVのデータを差し込む -->", "", $result_file);
	
	//CSVクローズ
	fclose($csv_fp);
	
	//画面表示
	echo $result_file;
	
	
//CSVファイルがないのでエラーを表示して終了
} else {
	echo "data csv not exists";
	exit;
}

/*
//BOMチェック関数
//引数のファイルポインタを3バイト読み取りBOMだったら、3バイト進めたファイルポインタを返す。
//BOMがなければファイルポインタを0に戻す。
function bomcheck($FilePointer){
	$bom = fread($FilePointer,3);
	if(strcmp($bom,"\xEF\xBB\xBF") == 0 ){
		// UTF-8 BOM found.
	}else{
		// not found.
		rewind($FilePointer, 0);
	}
	return $FilePointer;
}
*/
?>