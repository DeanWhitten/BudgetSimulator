import {
  InputNumber,
  Space,
  Button,
  Input,
  DatePicker,
  Table,
} from "antd";
import { useState } from "react";
import "./../App.css";
import { Collapse } from "antd";
const { Panel } = Collapse;

const fixedColumns = [
  {
    title: "Name",
    dataIndex: "name",
  },
  {
    title: "Occurence Date",
    dataIndex: "dueDate",
  },
  {
    title: "Total",
    dataIndex: "total",
  },
];

function Income() {
  const [expenses, setExpenses] = useState([]);
  const [name, setName] = useState("");
  const [dueDate, SetDueDate] = useState(null);
  const [amount, setAmount] = useState(0);


  const addNewExpense = () => {
    const newExpense = {
      key: expenses.length,
      name: name,
      dueDate: dueDate?.format("DD/MM/YYYY"),
      total: amount,
    };

    setExpenses([...expenses, newExpense]);
  };
  const incomeHeader = () => {
    const totalIncome = expenses.reduce(
      (acc, expense) => acc + expense.total,
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
  const tableDisplay = () => {
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
          style={{ width: "35vw" }}
          size={"small"}
          columns={fixedColumns}
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


  return (
    <div className="App" style={{ width: "37vw" }}>
      <Collapse accordion expandIconPosition="right">
        <Panel header={incomeHeader()} key={2}>
              <Space>
                <Input
                    style={{ width: "200px" }}
                    placeholder="Name of Income Source"
                    onChange={(event) => setName(event.target.value)}
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
                    onChange={setAmount}
                  />
                  <Button type="primary" onClick={addNewExpense}>
                    Add
                  </Button>
             </Space>

              <Space>
            {tableDisplay()}
          </Space>
          
        </Panel>
      </Collapse>
    </div>
  );
}

export default Income;
