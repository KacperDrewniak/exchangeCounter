const Cash = props => {
  const value = ((props.cash / props.ratio) * props.price).toFixed(2);
  return (
    <div>
      {props.title} : {props.cash <= 0 ? "" : value}
    </div>
  );
};

class ExchangeCounter extends React.Component {
  state = {
    amount: "",
    product: "electicity"
  };

  static defaultProps = {
    curriencies: [
      {
        id: 0,
        name: "zloty",
        ratio: 1,
        title: "Wartość w zlotych: "
      },
      {
        id: 1,
        name: "dollar",
        ratio: 3.6,
        title: "Wartość w dolarach: "
      },
      {
        id: 2,
        name: "euro",
        ratio: 4.1,
        title: "Wartość w euro: "
      },
      {
        id: 3,
        name: "pound",
        ratio: 5.2,
        title: "Wartość w pałndach: "
      }
    ],
    prices: {
      electricity: 0.51,
      gas: 4.76,
      oranges: 3.51
    }
  };

  handleChange = e => {
    this.setState({
      amount: e.target.value
    });
  };

  handleSelect = e => {
    this.setState({
      product: e.target.value
    });
  };

  inserSuffix(select) {
    if (select === "electricity") return <em>kWh</em>;
    else if (select === "gas") return <em>litrów</em>;
    else if (select === "oranges") return <em>kilogramów</em>;
    else return null;
  }

  selectPrice(select) {
    console.log(this.props.prices[select]);
    return this.props.prices[select];
  }

  render() {
    const { amount, product } = this.state;

    const calculators = this.props.curriencies.map(currency => (
      <Cash
        cash={amount}
        key={currency.id}
        ratio={currency.ratio}
        title={currency.title}
        price={this.selectPrice(product)}
      />
    ));

    return (
      <div className="app">
        <label>
          Wybierz Produkt :
          <select value={this.state.product} onChange={this.handleSelect}>
            <option value="electricity">Pront</option>
            <option value="gas">Gaziks</option>
            <option value="oranges">pomarańczki</option>
          </select>
        </label>
        <label>
          <input
            type="number"
            value={this.state.amount}
            onChange={this.handleChange}
          />
        </label>
        {this.inserSuffix(this.state.product)}
        {calculators}
      </div>
    );
  }
}

ReactDOM.render(<ExchangeCounter />, document.getElementById("root"));
