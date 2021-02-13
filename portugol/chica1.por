programa
{
	inclua biblioteca Matematica-->M
	
	funcao inicio()
	{
		inteiro vetor[10]
		inteiro desvio
		inteiro soma = 0
		inteiro media
		inteiro n
		inteiro m = 011
		
		
		
		escreva("Vetor de dados :")
		para (inteiro posicao = 0;posicao < 10; posicao++){
			escreva(" ")
			leia(vetor[posicao])
			soma = soma+vetor[posicao]
		}
		media = (soma/10)
		escreva(media)
		para (inteiro posicao = 0;posicao > 10; posicao++){
			n = vetor[posicao]-media
			m = M.potencia(n, 2)
		}
		escreva(M.raiz(m/10),2)				//x
	
	
	}
}
/* $$$ Portugol Studio $$$ 
 * 
 * Esta seção do arquivo guarda informações do Portugol Studio.
 * Você pode apagá-la se estiver utilizando outro editor.
 * 
 * @POSICAO-CURSOR = 8; 
 * @PONTOS-DE-PARADA = ;
 * @SIMBOLOS-INSPECIONADOS = ;
 * @FILTRO-ARVORE-TIPOS-DE-DADO = inteiro, real, logico, cadeia, caracter, vazio;
 * @FILTRO-ARVORE-TIPOS-DE-SIMBOLO = variavel, vetor, matriz, funcao;
 */