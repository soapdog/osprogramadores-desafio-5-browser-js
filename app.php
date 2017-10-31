<?php

	function showNome($var) {
		$ret = "";

		foreach($var as $func)
			$ret.= " {$func['nome']} {$func['sobrenome']},";

		$ret = trim($ret,',');

		return $ret;
	}

	$var = json_decode(file_get_contents($argv[1], "r"),true);

	$cont['geral'] = 0;
	$acum['geral'] = 0;
	$numFunc = [];
	$sobrenome = [];

	foreach($var['funcionarios'] as $func) {
		if (!IsSet($maior['geral']) || $func['salario'] > $maior['geral'][0]['salario'])
			$maior['geral']=[$func];
 		else if ($func['salario'] == $maior['geral'][0]['salario'])
			$maior['geral'][]=$func;

		if (!IsSet($menor['geral']) || $func['salario'] < $menor['geral'][0]['salario'])
			$menor['geral']=[$func];
		else if ($func['salario'] == $menor['geral'][0]['salario'])
			$menor['geral'][]=$func;

		if (!IsSet($maior[$func['area']]) || $func['salario'] > $maior[$func['area']][0]['salario'])
			$maior[$func['area']]=[$func];
 		else if ($func['salario'] == $maior[$func['area']][0]['salario'])
			$maior[$func['area']][]=$func;

		if (!IsSet($menor[$func['area']]) || $func['salario'] < $menor[$func['area']][0]['salario'])
			$menor[$func['area']]=[$func];
		else if ($func['salario'] == $menor[$func['area']][0]['salario'])
			$menor[$func['area']][]=$func;

		if (!IsSet($sobrenome[$func['sobrenome']]) || $func['salario'] > $sobrenome[$func['sobrenome']][0]['salario'] )
			$sobrenome[$func['sobrenome']] = [$func];
		else if ($func['salario'] == $sobrenome[$func['sobrenome']][0]['salario'])
			$sobrenome[$func['sobrenome']][] = $func;

		@$acum['geral']+=$func['salario'];
		@$cont['geral']++;
		@$acum[$func['area']]+=$func['salario'];
		@$cont[$func['area']]++;
		@$numFunc[$func['area']]++;
		@$sNome[$func['sobrenome']]++;
	}

	asort($numFunc);

	foreach($maior as $key=>$value) {
		if ($key=='geral')
			echo "Total:\n";
		else
			echo "Área {$key}:\n";

		echo "\t- Maior:".showNome($maior[$key])." (".number_format($maior[$key][0]['salario'],2,',','.').")\n";
		echo "\t- Menor:".showNome($menor[$key])." (".number_format($maior[$key][0]['salario'],2,',','.').")\n";
		echo "\t- Média: (".number_format($acum[$key]/$cont[$key],2,',','.').")\n\n";
	}

	reset($numFunc);
	echo "A área com menos funcionários é a ".key($numFunc)." com ".number_format(current($numFunc),0,',','.')."\n";
	end($numFunc);
	echo "A área com mais funcionários é a ".key($numFunc)." com ".number_format(current($numFunc),0,',','.')."\n\n";

	foreach ($sobrenome as $key=>$value) {
		if ($sNome[$key]==1)	continue;

		echo "Sobrenome ($key) quem ganha mais é".showNome($sobrenome[$key])." (".number_format($value[0]['salario'],2,',','.').")\n";
	}
