/* eslint-disable react/no-unused-state */
import Taro, { Component, Config } from "@tarojs/taro";
import { View, ScrollView, Image } from "@tarojs/components";
import { AtSearchBar } from 'taro-ui'
import { getCommonSearchList } from '@/api/searchPage'
// import "./index.scss";

type StateType = {
  [propName: string]: any;
};

type ComponentsProps = {
  [propName: string]: any;
};

interface _page {
  props: ComponentsProps;
  state: StateType;
}

class _page extends Component {
  constructor(props) {
    super(props);
  }

  state: StateType = {
    form: {
      keyword: '',
      pageIndex: 1,
      pageSize: 10
    }
  };

  componentWillMount() {
    console.log(this.$router.params)
  }

  componentDidMount() {

  }

  componentWillUnmount() { }

  componentDidHide() { }

  componentDidShow() {

  }

  componentWillReact() { }
  onInputChange = val => {
    let data = { ...this.state.form }
    data.keyword = val
    this.setState({ form: data })
    console.log('val', val)
  }
  onActionClick = () => {
    console.log('开始搜索')
    const { form } = this.state
    getCommonSearchList(form).then(res => {
      console.log('search res', res)
    })

  }

  render() {
    const { form } = this.state
    return (
      <View className="page" id="page">
        <AtSearchBar
          value={form.keyword}
          onChange={(e) => this.onInputChange(e)}
          onActionClick={() => this.onActionClick()}
        />
      </View>
    );
  }
}

export default _page;
