import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Divider, Paragraph, Title } from 'react-native-paper';

const Ajuda: React.FC = () => {
    return (
        <ScrollView style={styles.viewAjuda}>
            <Text children='Adapt - Sistema de Gestão Empresarial' style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 22 }} numberOfLines={1} ellipsizeMode={'clip'} adjustsFontSizeToFit={true} />
            <Divider style={styles.divider} />
            <Text style={styles.textAjuda}>
                O sistema ADAPT é um ERP (Entreprise Resource Planning), Sistema Integrado de Gestão Empresarial,
                que tem por finalidade automatizar e controlar todos os processos dentro de uma organização integrando-os
                de forma simples, de maneira que suas informações possam ser visualizadas e manipuladas de forma simples e completa.
            </Text>
            <Text style={styles.textAjuda}>
                Diferentemente de outros ERP's que existem no mercado, o ADAPT é totalmente voltado para Nuvem (Internet) de
                maneira que seus usuários precisam apenas ter em seus computadores um navegador de internet instalado em seu computador.
                Não é necessário que a empresa que tem o Adapt invista em Hardware caros, servidores, profissionais de T.I para
                manipular esses recursos e nem se preocupar com a segurança de suas informações, pois a equipe ADAPT fará tudo por ela.
            </Text>
            <Text style={styles.textAjuda}>
                Outro diferencial do ADAPT é sua velocidade como processa as informações e às exibe ao usuário como também a facilidade
                de navegação pelos seus botões. Ele possui uma interface totalmente amigável e fácil acesso.
            </Text>
            <Text style={styles.textAjuda}>
                É importante saber que o sistema ADAPT – Sistema de Gestão Empresarial
                trabalhar com hierarquia e sessões. Isso significa que a visualização das
                funcionalidades e módulos de acordo com o nível hierárquico de cada usuário
            </Text>
            <Text style={styles.textAjuda}>
                A identificação é feita logo na primeira tela do sistema, que é o login. De
                acordo com o login do usuário o sistema irá conseguir identificar qual seu nível
                hierárquico e irá mostrar apenas a funcionalidades de sua alçada.
            </Text>
            <Divider style={styles.divider} />
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                <Text children={'COPYRIGHT© - TODOS OS DIREITOS RESERVADOS - 2010 PSE2'} style={styles.copyright} numberOfLines={1} ellipsizeMode={'clip'} adjustsFontSizeToFit={true} />
            </View>
        </ScrollView>
    );
}

export default Ajuda;

const styles = StyleSheet.create({
    viewAjuda: { flex: 1, marginHorizontal: 15 },
    divider: { marginVertical: 10 },
    textAjuda: { textAlign: 'justify', fontSize: 15, marginVertical: 3 },
    copyright: { fontWeight: 'bold', fontSize: 18 }
})