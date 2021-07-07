import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

//APP
import Dashboard from '../pages/Dashboard'
import Configuracoes from '../pages/Dashboard/Configuracoes/configuracoes'
import Organizacoes from '../pages/Dashboard/Configuracoes/organizacoes'
import Sobre from '../pages/Dashboard/Configuracoes/Sobre'

//Module Reservas
import Reservas from '../pages/Modules/Reservas/index'
import FormReservas from '../pages/Modules/Reservas/form'

//Module Rotas
import Rotas from '../pages/Modules/Rotas/index'
import Mapa from '../pages/Modules/Rotas/Mapa'
import DetalheMapa from '../pages/Modules/Rotas/DetalheMapa'

//Module Suprimentos
import Suprimentos from '../pages/Modules/Suprimentos/index'
import Estoque from '../pages/Modules/Suprimentos/Estoque'
import MovimentoEstoque from '../pages/Modules/Suprimentos/movimentoEstoque'
import Transferencia from '../pages/Modules/Suprimentos/transferencia'

//module Rotas
import Ponto from '../pages/Modules/Ponto'
import CameraPonto from '../pages/Modules/Ponto/camera'
import FinalizaPOnto from '../pages/Modules/Ponto/finalizaPonto'

//module Fiscalização de condomínio
import FiscalCondom from '../pages/Modules/FiscalCondom'
import CameraFiscal from '../pages/Modules/FiscalCondom/cameraFiscal'
import FormularioFiscal from '../pages/Modules/FiscalCondom/formulário'
import FinalizarFiscalizacao from '../pages/Modules/FiscalCondom/finalizar'

export type AppParamsList = {
    //APP
    Dashboard: undefined | object
    Configuracoes: undefined | object
    Organizacoes: undefined | object
    Sobre: undefined | object

    //module Reserva
    Reservas: undefined | object
    FormReservas: undefined | object

    //module rotas
    Rotas: undefined | object
    Mapa: undefined | object
    DetalheMapa: undefined | object

    //module suprimentos
    Suprimentos: undefined | object
    Estoque: undefined | object
    MovimentoEstoque: undefined | object
    Transferencia: undefined | object

    //module ponto
    Ponto: undefined | object
    CameraPonto: undefined | object
    FinalizaPonto: undefined | object

    //module Fiscalização de condominio
    FiscalCondom: undefined | object
    CameraFiscal: undefined | object
    FormularioFiscal: undefined | object
    FinalizarFiscalizacao: undefined | object

}

const AppStack = createStackNavigator<AppParamsList>();

const AppRoutes: React.FC = (props) => {
    return (
        <AppStack.Navigator>
            {/** app */}
            <AppStack.Screen name='Dashboard' component={Dashboard} options={{ headerShown: false }} />
            <AppStack.Screen name='Configuracoes' component={Configuracoes} options={{ title: 'Configurações' }} />
            <AppStack.Screen name='Organizacoes' component={Organizacoes} options={{ title: 'Organizações' }} />
            <AppStack.Screen name='Sobre' component={Sobre} options={{ title: 'Sobre' }} />
            {/** Módulo de Reservas */}
            <AppStack.Screen name='Reservas' component={Reservas} />
            <AppStack.Screen name='FormReservas' component={FormReservas} options={{ title: 'Nova Reserva' }} />
            {/** Módulo de Rotas */}
            <AppStack.Screen name='Rotas' component={Rotas} />
            <AppStack.Screen name='Mapa' component={Mapa} />
            <AppStack.Screen name='DetalheMapa' component={DetalheMapa} options={{ title: 'Informações adicionais' }} />
            {/** Módulo de Suprimentos */}
            <AppStack.Screen name='Suprimentos' component={Suprimentos} />
            <AppStack.Screen name='Estoque' component={Estoque} />
            <AppStack.Screen name='MovimentoEstoque' component={MovimentoEstoque} options={{ title: 'Movimentação do Estoque' }} />
            <AppStack.Screen name='Transferencia' component={Transferencia} options={{ title: 'Transferência de Material' }} />
            {/** Módulo de Ponto */}
            <AppStack.Screen name='Ponto' component={Ponto} options={{ title: 'Bater Ponto' }} />
            <AppStack.Screen name='CameraPonto' component={CameraPonto} options={{ title: 'Bater Ponto' }} />
            <AppStack.Screen name='FinalizaPonto' component={FinalizaPOnto} options={{ title: 'Bater Ponto' }} />
            {/** Módulo Fiscalização de condomínio */}
            <AppStack.Screen name='FiscalCondom' component={FiscalCondom} options={{ title: 'Fiscalizar Condomínio' }} />
            <AppStack.Screen name='CameraFiscal' component={CameraFiscal} options={{ title: 'Fiscalizar Condomínio' }} />
            <AppStack.Screen name='FormularioFiscal' component={FormularioFiscal} options={{ title: 'Checklist' }} />
            <AppStack.Screen name='FinalizarFiscalizacao' component={FinalizarFiscalizacao} options={{ title: 'Finalizar Fiscalização' }} />
        </AppStack.Navigator>
    )
}

export default AppRoutes