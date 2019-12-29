/* eslint-disable react/no-unused-state */
import Taro, { Component } from "@tarojs/taro";
import { View } from "@tarojs/components";
import { AtSearchBar } from 'taro-ui'
import { getCommonSearchList } from '@/api/searchPage'
import GoodItem from './components/card'
import { toDetailByCategory } from '@/utils/utils'
import "./index.scss";

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
    },
    list: []
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
    getCommonSearchList(form).then((res: any) => {
      console.log('search res', res)
      if (res.code == 'OK') {
        const list = res.data.list
        this.setState({ list })
      }
    })

  }

  onTapItem = item => {
    console.log('item', item);
    toDetailByCategory(item)

  }

  render() {
    const { form, list } = this.state
    return (
      <View className="search_page" >
        <AtSearchBar
          value={form.keyword}
          onChange={(e) => this.onInputChange(e)}
          onActionClick={() => this.onActionClick()}
        />
        {
          list && list.map(item => (
            <GoodItem data={item} onTapCard={() => this.onTapItem(item)}></GoodItem>
          ))
        }
      </View>
    );
  }
}

export default _page;
