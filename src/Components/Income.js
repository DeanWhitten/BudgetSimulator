import {
  InputNumber,
  Space,
  Button,
  Input,
  DatePicker,
  Table,
  Row,
  Col,
  Statistic,
  Collapse
} from "antd";
import { useState,useEffect  } from "react";
import "./../App.css";

const { Panel } = Collapse;

const sourceColumns = [
  {
    title: "Name",
    dataIndex: "sourceName",
  },
  {
    title: "Occurence Date",
    dataIndex: "sourceDate",
  },
  {
    title: "Total",
    dataIndex: "sourceTotal",
  },
];
const expensesColumns = [
  {
    title: "Name",
    dataIndex: "expenseName",
  },
  {
    title: "Due Date",
    dataIndex: "expenseDueDate",
  },
  {
    title: "Total",
    dataIndex: "total",
  },
];

function Income() {
  const [incomeSource, setIncomeSource] = useState([]);
  const [sourceName, setSourceName] = useState("");
  const [sourceDate, SetDueDate] = useState(null);
  const [sourceAmount, setSourceAmount] = useState(0);

  const [expenses, setExpenses] = useState([]);
  const [expenseName, setExpenseName] = useState("");
  const [expenseDueDate, SetExpenseDueDate] = useState(null);
  const [expensesAmount, setExpensesAmount] = useState(0);

  const [leftover, setLeftover] = useState(0);

  const addNewSource = () => {
    const newSource = {
      key: incomeSource.length,
      sourceName: sourceName,
      sourceDate: sourceDate?.format("DD/MM/YYYY"),
      sourceTotal: sourceAmount,
    };

    setIncomeSource([...incomeSource, newSource]);
  };
  const incomeHeader = () => {
    const totalIncome = incomeSource.reduce(
      (acc, Source) => acc + Source.sourceTotal,
      0
    );
    const formattedIncome = `$${totalIncome
      .toFixed(2)
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;

    return (
      <div style={{ display: "flex" }}>
        <div style={{ width: "50%", textAlign: "initial", fontWeight: "bold" }}>
          Income Sources:{" "}
        </div>
        <div style={{ width: "50%", textAlign: "right" }}>
          {formattedIncome}
        </div>
      </div>
    );
  };
  const sourceTableDisplay = () => {
    if (incomeSource.length !== 0) {
      return (
        <Table
          onRow={(record, rowIndex) => {
            return {
              onMouseEnter: (e) => {
                e.currentTarget.classList.add("hovered-row");
              },
              onMouseLeave: (e) => {
                e.currentTarget.classList.remove("hovered-row");
              },
              onClick: (e) => {
                const updatedIncomeSource = [...incomeSource]; // make a copy of incomeSource array
                updatedIncomeSource.splice(rowIndex, 1); // remove the clicked Source from the copy
                setIncomeSource(updatedIncomeSource); // update state with the new incomeSource array
              },
            };
          }}
          style={{ width: "35vw" }}
          size={"small"}
          columns={sourceColumns}
          dataSource={incomeSource}
          pagination={false}
          scroll={{
            x: 200,
            y: 300,
          }}
          bordered
        />
      );
    }
  };

  const addNewExpense = () => {
    const newExpense = {
      key: expenses.length,
      expenseName: expenseName,
      expenseDueDate: expenseDueDate?.format("DD/MM/YYYY"),
      total: expensesAmount,
    };

    setExpenses([...expenses, newExpense]);
  };
  const expenseHeader = () => {
    const totalExpenses = expenses.reduce(
      (acc, expense) => acc + expense.total,
      0
    );
    const formattedIncome = `$${totalExpenses
      .toFixed(2)
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
    return (
      <div style={{ display: "flex" }}>
        <div style={{ width: "50%", textAlign: "initial", fontWeight: "bold" }}>
          Expenses:{" "}
        </div>
        <div style={{ width: "50%", textAlign: "right" }}>
          {formattedIncome}
        </div>
      </div>
    );
  };
  const expensesTableDisplay = () => {
    if (expenses.length !== 0) {
      return (
        <Table
          onRow={(record, rowIndex) => {
            return {
              onMouseEnter: (e) => {
                e.currentTarget.classList.add("hovered-row");
              },
              onMouseLeave: (e) => {
                e.currentTarget.classList.remove("hovered-row");
              },
              onClick: (e) => {
                const updatedExpenses = [...expenses]; // make a copy of expenses array
                updatedExpenses.splice(rowIndex, 1); // remove the clicked expense from the copy
                setExpenses(updatedExpenses); // update state with the new expenses array
              },
            };
          }}
          size={"small"}
          style={{ width: "35vw" }}
          columns={expensesColumns}
          dataSource={expenses}
          pagination={false}
          scroll={{
            x: 200,
            y: 300,
          }}
          bordered
        />
      );
    }
  };

  useEffect(() => {
    const totalIncome = incomeSource.reduce(
      (acc, Source) => acc + Source.sourceTotal,
      0
    );
    const totalExpenses = expenses.reduce(
      (acc, expense) => acc + expense.total,
      0
    );
    const leftOverAmount = totalIncome + totalExpenses;
    setLeftover(leftOverAmount);
  }, [incomeSource, expenses]);

  return (
    <div className="App" style={{ width: "100vw", paddingTop:'5vh' }}>
      <Row style={{width:'90vw', borderBottom:'2px  solid lightgray', borderTop:'2px  solid lightgray',  marginBottom:'3vh', marginLeft:'4vw', paddingBottom:'2vh', paddingTop:'2vh'}} gutter={20}>
        <Col span={22} style={{ textAlign: "left"}}>
          <h1 >Income Leftovers Calculator</h1>
        </Col>
        <Col style={{textAlign: "right", paddingLeft:'2vw' }}>
          <Statistic
            title="Leftover"
            value={`$${leftover
              .toFixed(2)
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`}
          ></Statistic>
        </Col>
      </Row>
      <Row style={{width:'100vw' }} gutter={20}>
        <Col span={12} style={{paddingLeft:'5vw'}}>
          <Collapse accordion expandIconPosition="right">
            <Panel header={incomeHeader()} key={2}>
              <Space>
                <Input
                  style={{ width: "200px" }}
                  placeholder="Name of Income Source"
                  onChange={(event) => setSourceName(event.target.value)}
                />
                <DatePicker onChange={SetDueDate} />
                <InputNumber
                  style={{
                    width: "100px",
                  }}
                  fixed={2}
                  precision={2}
                  defaultValue={0.0}
                  formatter={(value) =>
                    `$ ${value.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`
                  }
                  parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                  onChange={setSourceAmount}
                />
                <Button type="primary" onClick={addNewSource}>
                  Add
                </Button>
              </Space>

              <Space>{sourceTableDisplay()}</Space>
            </Panel>
          </Collapse>
        </Col>
        <Col span={12} style={{paddingRight:'5vw'}}>
          <Collapse accordion expandIconPosition="right">
            <Panel header={expenseHeader()} key="1">
              <Space>
                <Input
                  style={{ width: "200px" }}
                  placeholder="Name of Expense"
                  onChange={(event) => setExpenseName(event.target.value)}
                />
                <DatePicker onChange={SetExpenseDueDate} />
                <InputNumber
                  style={{
                    width: "100px",
                  }}
                  fixed={2}
                  precision={2}
                  defaultValue={0.0}
                  formatter={(value) =>
                    `$ ${-value.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`
                  }
                  parser={(value) => -value.replace(/\$\s?|(,*)/g, "")}
                  onChange={setExpensesAmount}
                />
                <Button type="primary" onClick={addNewExpense}>
                  Add
                </Button>
              </Space>
              <Space>{expensesTableDisplay()}</Space>
            </Panel>
          </Collapse>
        </Col>
      </Row>
    </div>
  );
}

export default Income;
