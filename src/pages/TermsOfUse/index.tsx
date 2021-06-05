import React from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Title, Text } from './styles';

const SignUpModal: React.FC = () => {
  return (
    <SafeAreaView edges={['bottom']}>
      <ScrollView
        style={{
          padding: 16,
          marginBottom: 8,
        }}
      >
        <Title>Política Privacidade</Title>
        <Text>
          A sua privacidade é importante para nós. É política do HomeHelper
          respeitar a sua privacidade em relação a qualquer informação sua que
          possamos coletar no site HomeHelper, e outros sites que possuímos e
          operamos. Solicitamos informações pessoais apenas quando realmente
          precisamos delas para lhe fornecer um serviço. Fazemo-lo por meios
          justos e legais, com o seu conhecimento e consentimento. Também
          informamos por que estamos coletando e como será usado. Apenas retemos
          as informações coletadas pelo tempo necessário para fornecer o serviço
          solicitado. Quando armazenamos dados, protegemos dentro de meios
          comercialmente aceitáveis para evitar perdas e roubos, bem como
          acesso, divulgação, cópia, uso ou modificação não autorizados. Não
          compartilhamos informações de identificação pessoal publicamente ou
          com terceiros, exceto quando exigido por lei. O nosso site pode ter
          links para sites externos que não são operados por nós. Esteja ciente
          de que não temos controle sobre o conteúdo e práticas desses sites e
          não podemos aceitar responsabilidade por suas respectivas. Você é
          livre para recusar a nossa solicitação de informações pessoais,
          entendendo que talvez não possamos fornecer alguns dos serviços
          desejados. O uso continuado de nosso site será considerado como
          aceitação de nossas práticas em torno de privacidade e informações
          pessoais. Se você tiver alguma dúvida sobre como lidamos com dados do
          usuário e informações pessoais, entre em contacto connosco.
        </Text>
        <Title> Compromisso do Usuário </Title>
        <Text>
          O usuário se compromete a fazer uso adequado dos conteúdos e da
          informação que o HomeHelper oferece no site e com caráter enunciativo,
          mas não limitativo:
          <Text>
            A) Não se envolver em atividades que sejam ilegais ou contrárias à
            boa fé a à ordem pública;
          </Text>{' '}
          B) Não difundir propaganda ou conteúdo de natureza racista,
          xenofóbica, ou apostas desportivas, jogos de sorte e azar, qualquer
          tipo de pornografia ilegal, de apologia ao terrorismo ou contra os
          direitos humanos; C) Não causar danos aos sistemas físicos (hardwares)
          e lógicos (softwares) do HomeHelper, de seus fornecedores ou
          terceiros, para introduzir ou disseminar vírus informáticos ou
          quaisquer outros sistemas de hardware ou software que sejam capazes de
          causar danos anteriormente mencionados.{' '}
        </Text>
        <Title>Mais informações</Title>
        <Text>
          Esperemos que esteja esclarecido e, como mencionado anteriormente, se
          houver algo que você não tem certeza se precisa ou não, geralmente é
          mais seguro deixar os cookies ativados, caso interaja com um dos
          recursos que você usa em nosso site. Esta política é efetiva a partir
          de Maio/2021.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUpModal;