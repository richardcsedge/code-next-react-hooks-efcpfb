# code-next-react-hooks

[Edit on StackBlitz ⚡️](https://stackblitz.com/edit/code-next-react-hooks)

A lesson for the [Code Next](https://codenext.withgoogle.com/) React club.

In this lesson, engineers will

- how to make side effects
- learn hooks provided from React
- know the Rules of Hooks
- know how to compose their own hooks

## Side Effects

Sometimes you want different things to happen during an event or when state changes. Most of the time, you can make state changes inside of the render function. Other times, its better to put the side effect in an event handler.

```jsx
const Foo = () => {
  const [count, setCount] = useState(0);
  const [taken, setTaken] = useState(false);

  // This is derivable from state, so we can just calculate it inside the function
  // instead of create new state for it.
  const total = Math.pow(2, count);

  const take = () => {
    setTaken(true);
    // a side effect alerting the user
    alert(`you took ${total}!`);
  };

  const incrementCount = () => {
    setCount(count + 1);
  };

  return (
    <div>
      <div>count: {count}</div>
      <div>total: {total}</div>
      <div>status: {taken ? 'TAKEN' : 'NOT TAKEN'}</div>

      <br />

      <button disabled={taken} onClick={take}>
        take it
      </button>
      <button disabled={taken} onClick={incrementCount}>
        double it and give it to the next person
      </button>
    </div>
  );
};
```

### YOUR TURN

Open `src/SideEffects.js` and practice.

## UseEffect

The next most important hook at readily at your disposal is the `useEffect` hook. It's used to synchronize your React application with external systems such as a server or even Web APIs like `setTimeout`.

> NOTE: You can see the hooks React provides in the React docs ([legacy](https://reactjs.org/docs/hooks-reference.html), [new](https://react.dev/reference/react)).

`useEffect` also has a way to perform cleanups. This is useful when a dependency changes and invalidates the side effect or when the component goes out of scope. Cleanup happens [before](https://reactjs.org/docs/hooks-reference.html#cleaning-up-an-effect) the next effect is executed.

For example, let's say we have a chat application and we wanted to subscribe to all the messages going into a channel.

```jsx
import { client } from 'some-chat-application-library';

const ChatLog = (props) => {
  const [messages, setMessages] = useState([]);
  const channelId = props.channelId;

  useEffect(() => {
    const subscription = client.subscribe(channelId, (message) => {
      setMessages((messages) => [...messages, message]);
    });
    return () => {
      // When the channelId changes, we no longer want to receive notifications
      // about the old channelId.
      subscription.unsubscribe();
      setMessages([]);
    };
  }, [channelId]);

  return (
    <ul>
      {messages.map((message) => <li key={message.id}>{message.text}</li>)}
    </ul>
  );
};
```

Notice that `useEffect` takes two parameters. The first one is a function that contains effectful code, and the second one is a dependency array. The dependency array should contain the state that should trigger the function when the value _changes_. If all the values in the dependency array are the same, the effectful code will not run.

Another example is using `setInterval`. You don't want the interval to run when the component goes out of scope.

```jsx
const SecondsAgo = () => {
  const [secondsAgo, setSecondsAgo] = useState(0);

  // NOTE: An empty dependency array will cause the effect to only be run once.
  // the cleanup will run when the component goes out of scope.
  useEffect(() => {
    const startMs = Date.now();
    const handle = setInterval(() => {
      const endMs = Date.now();
      const ms = endMs - startMs;
      const sec = Math.round(ms / 1000);
      setSecondsAgo(sec);
    }, 1000);
    return () => {
      clearInterval(handle);
    };
  }, []);

  return <div>{secondsAgo} seconds ago</div>;
};
```

> NOTE: There are a lot of times when you don't need to `useEffect`. Checkout [the useEffect docs](https://react.dev/reference/react/useEffect) for good examples of when to use it and [You Might Not Need an Effect](https://react.dev/learn/you-might-not-need-an-effect) article showing examples of when not to use it.

### YOUR TURN

Open `src/UseEffect.js` and practice.

## Custom Hooks

Hooks are highly composable and portable. This means you can create your own hooks and use them in several different components.

```jsx
const useToggle = (initial = false) => {
  const [value, setValue] = useState(initial);

  const toggle = useCallback(() => {
    setValue((value) => !value);
  }, [])

  return [value, toggle];
};

const Foo = () => {
  const [value, toggle] = useToggle();

  return (
    <>
      <div>value: {value}</div>
      <button onClick={toggle}>toggle</button>
    </>
  );
};

const Bar = () => {
  const [value, toggle] = useToggle(true);

  return (
    <>
      <div>value: {value}</div>
      <button onClick={toggle}>toggle</button>
    </>
  );
};

```

However, React has rules you must follow when creating and using hooks. Open and bookmark https://reactjs.org/docs/hooks-rules.html.

Read it once. Read it twice. Try to explain it in your own words.

Violating these rules will lead to _undefined_ behavior. Sometimes it might work favorably, but often times it will not. There's also no guarantee that it will continue working as libraries change.

### YOUR TURN

Open `src/CustomHooks.js` and practice.
