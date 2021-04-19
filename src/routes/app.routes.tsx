import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

//APP
import Dashboard from '../pages/Dashboard'

//Module Reservas
import Reservas from '../pages/Modules/Reservas/index'
import FormReservas from '../pages/Modules/Reservas/form'

//Module Rotas
import Rotas from '../pages/Modules/Rotas/index'
import Mapa from '../pages/Modules/Rotas/Mapa'
import DetalheMapa from '../pages/Modules/Rotas/DetalheMapa'

//Module Suprimentos
import Suprimentos from '../pages/Modules/Suprimentos/index'
import AprovCotacao from '../pages/Modules/Suprimentos/AprovarCotacao'
import AprovPedido from '../pages/Modules/Suprimentos/AprovarPedido'
import AprovSolicitacao from '../pages/Modules/Suprimentos/AprovarSolicitacao'
import Solicitacao from '../pages/Modules/Suprimentos/Solicitacao'
import Pedido from '../pages/Modules/Suprimentos/Pedido'
import Cotacao from '../pages/Modules/Suprimentos/Cotacao'
import Recebimento from '../pages/Modules/Suprimentos/Recebimento'
import Inventario from '../pages/Modules/Suprimentos/Inventario'
import Almoxarifado from '../pages/Modules/Suprimentos/Almoxarifado'
import Estoque from '../pages/Modules/Suprimentos/Estoque'

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

    //module Reserva
    Reservas: undefined | object
    FormReservas: undefined | object

    //module rotas
    Rotas: undefined | object
    Mapa: undefined | object
    DetalheMapa: undefined | object

    //module suprimentos
    Suprimentos: undefined | object
    Cotacao: undefined | object
    Pedido: undefined | object
    Solicitacao: undefined | object
    AprovSolicitacao: undefined | object
    AprovCotacao: undefined | object
    AprovPedido: undefined | object
    Inventario: undefined | object
    Recebimento: undefined | object
    Almoxarifado: undefined | object
    Estoque: undefined | object
    
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
            {/** Módulo de Reservas */}
            <AppStack.Screen name='Reservas' component={Reservas} />
            <AppStack.Screen name='FormReservas' component={FormReservas} options={{ title: 'Nova Reserva' }} />
            {/** Módulo de Rotas */}
            <AppStack.Screen name='Rotas' component={Rotas} />
            <AppStack.Screen name='Mapa' component={Mapa} />
            <AppStack.Screen name='DetalheMapa' component={DetalheMapa} options={{ title: 'Informações adicionais' }} />
            {/** Módulo de Suprimentos */}
            <AppStack.Screen name='Suprimentos' component={Suprimentos} />
            <AppStack.Screen name='AprovCotacao' component={AprovCotacao} options={{ title: 'Aprovar Cotação' }} />
            <AppStack.Screen name='AprovPedido' component={AprovPedido} options={{ title: 'Aprovar Pedido' }} />
            <AppStack.Screen name='AprovSolicitacao' component={AprovSolicitacao} options={{ title: 'Aprovar Solicitação' }} />
            <AppStack.Screen name='Solicitacao' component={Solicitacao} options={{ title: 'Solicitação' }} />
            <AppStack.Screen name='Pedido' component={Pedido} />
            <AppStack.Screen name='Cotacao' component={Cotacao} options={{ title: 'Cotação' }} />
            <AppStack.Screen name='Inventario' component={Inventario} options={{ title: 'Inventário' }} />
            <AppStack.Screen name='Recebimento' component={Recebimento} />
            <AppStack.Screen name='Almoxarifado' component={Almoxarifado} />
            <AppStack.Screen name='Estoque' component={Estoque} />
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