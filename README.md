# 추천 검색창 구현

**참고 사이트**
[한국임상정보](https://clinicaltrialskorea.com/)

<img width="80%" src="https://github.com/totter15/pre-onboarding-11th-4/assets/71440070/b63af331-8094-453d-a19b-3cd1324415fe"/>

<br/>

# 구현 목표

- 질환명 검색시 API호출을 통해서 검색어 추천 기능 구현
- API 호출별로 로컬 캐싱 구현
- 입력마다 API 호출하지 않도록 API 호출 횟수를 줄이는 전략 수립 및 실행
- API를 호출할 때 마다 console.info("calling api") 출력을 통해 콘솔창에서 API 호출 횟수 확인이 가능하도록 설정
- 키보드만으로 추천 검색어들로 이동 가능하도록 구현

<br/>

# 실행방법

> 1.  먼저 [서버](https://github.com/walking-sunset/assignment-api)를 실행시켜 줍니다.
> 2.  `npm install`
> 3.  `npm start`

<br/>

# 기능 구현 설명

### API 호출별로 로컬 캐싱 구현

```js
//pages/Search.tsx
const getSearchList = useCallback(async (query: string) => {
	const { getCache, saveCache, deleteCache } = caching();
	if (query === '') {
		setSearchList([]);
		return;
	}

	const { data: cache, expire } = getCache(query) ?? {};
	const now = new Date();
	const isExpire = now.getTime() > expire;
	setSelectIndex(-1);

	//캐싱된 데이터가 있으며 expire되지 않은 경우
	if (cache && !isExpire) return setSearchList(cache);

	//expire된 경우 캐싱된 데이터 삭제
	if (isExpire) deleteCache(query);

	const data = await getSearch(query);
	const day_3 = 86400000;

	saveCache(query, data, day_3);
	setSearchList(data);
}, []);

//utils/caching.tsx
export function caching(): Caching {
	function saveCache(key: string, data: SearchItem[], ttl: number = 0) {
		const now = new Date();

		localStorage.setItem(
			key,
			JSON.stringify({ data, expire: now.getTime() + ttl })
		);
	}

	function getCache(key: string) {
		const list = localStorage.getItem(key);
		if (list) return JSON.parse(list);
	}

	function deleteCache(key: string) {
		localStorage.removeItem(key);
	}

	return { saveCache, getCache, deleteCache };
}
```

localStorage에 검색어와 검색 데이터를 저장하고, 만약 검색어에 해당하는 캐싱된 데이터가 없는 경우 api를 호출합니다.

캐싱은 localStorage로 하였으며 caching이라는 util함수를 만들어 사용했습니다. `saveCache`시 ttl(time-to-live)을 받고 `getCache`시에 시간을 확인 후 expire을 구현해 주었습니다.

<br/>

### 호출 횟수를 줄이는 전략

```Js
//hooks/useDebounce.tsx
function useDebounce<T>(func: () => void, delay: number, deps: T) {
const callback = useCallback(func, [deps]);

useEffect(() => {
	const timer = setTimeout(() => {
		callback();
	}, delay);

	return () => {
		clearTimeout(timer);
	};
}, [callback, delay]);
}


//pages/Search.tsx
useDebounce(
	() => {
		const trimQuery = inputValue.trim();
		getSearchList(trimQuery);
	},
	500,
	inputValue.trim()
);
```

**useDebounce**란 hook을 만들고 inputValue가 변경될때마다 debounce가 작동하여 키보드에 입력을 멈추고 500ms뒤에 추천 검색어를 가져오게 만들었습니다. 검색어 앞뒤의 띄어쓰기가 있을경우 같은 내용의 호출이 생기므로 trim()으로 삭제후 리스트를 가져왔습니다.

<br/>

### 키보드 만으로 추천 검색어들로 이동 구현

```js
const listTopDownHandler = useCallback(
	(e: any) => {
		const up = e.keyCode === 38;
		const down = e.keyCode === 40;

		const firstIndex = 0;
		const lastIndex = searchList.length - 1;

		if (up) {
			if (selectIndex === firstIndex) return setSelectIndex(lastIndex);
			setSelectIndex((prev) => prev - 1);
		}
		if (down) {
			selectIndex >= lastIndex
				? setSelectIndex(0)
				: setSelectIndex((prev) => prev + 1);
		}
	},
	[selectIndex, searchList]
);
```

selectIndex값을 useState로 저장하고 input의 onKeyDown시 키보드의 위, 아래키를 눌렀을때 상태값을 변하게 만들었습니다.
