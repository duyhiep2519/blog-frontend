import { MainPage } from "Admin";
import { Layout } from "components";
import { About, Detail, Home, PostArticle, Search, SignIn } from "pages";
import React from "react";
import { useSelector } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

const AppRouter = () => {
  const user = useSelector((state) => state.user);
  if (user && user.user.role !== null && user.user.role === "admin")
    return (
      <Router>
        <Switch>
          <Layout>
            <Route exact path="/" component={Home} />
            <Route path="/detail/:slug" component={Detail} />
            <Route path="/post" component={PostArticle} />
            <Route path="/about" component={About} />
            <Route path="/signin" component={SignIn} />
            <Route path="/admin" component={MainPage} />
            <Route path="/search" component={Search} />
          </Layout>
        </Switch>
      </Router>
    );
  else
    return (
      <Router>
        <Switch>
          <Layout>
            <Route exact path="/" component={Home} />
            <Route path="/detail/:slug" component={Detail} />
            <Route path="/about" component={About} />
            <Route path="/signin" component={SignIn} />

            <Route path="/search" component={Search} />
          </Layout>
        </Switch>
      </Router>
    );
};

export default AppRouter;
