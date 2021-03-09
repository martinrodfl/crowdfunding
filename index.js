class Mozo {

  private $cocina;
  private $bar;

  public function __construct(Cocina $cocina, Bar $bar) {
    $this->cocina = $cocina;
    $this->bar = $bar;
  }

  public function atenderCliente($client) {
    $pedido = $client->tomarPedido();
    $cocina->pedirPedido($pedido);
  }
}

// Mi restoran
$cocina1 = new CocinaReal(); // intencion: crear platos, servir clientes
$bar1 = new Bar();

// El restoran del Carlos
$cocina2 = new CocinaReal();
$bar2 = new Bar();

$mozo = new Mozo($cocina1, $bar1);

interface Cocina {
  public function pedirPedido($pedido);
  public function pedidoCompletado($mozo);
}

class CocinaReal extends Cocina {
  public function pedirPedido($pedido) {};
  public function pedidoCompletado($mozo) {};
}

class CocinaFalsa extends Cocina {
  public function pedirPedido($pedido);
  public function pedidoCompletado($mozo);
  public function pedidoRecibido();
}

// Durante test...

$cocina = new CocinaFalsa(); // alcahuete. intencion: alcahuetear, dar informacion sobre su uso
$bar = new BarFalso(); // alcahuete

$mozo = new Mozo($cocina, $bar);

$pedido = new Pedido();
$cliente = new Client($pedido);

$mozo->atenderClient($cliente);
expect($cocina->pedidoRecibido()).toEqual($pedido);

$cocina->pedidoCompletado($mozo);
expect($mozo->entregoPedido()).toBeTrue();

///

function atenderCliente(pedirPedido) {

}

// A testear

function pedirPedidoFalso() {
// alcahuete
}

atenderCliente(pedirPedidoFalso);