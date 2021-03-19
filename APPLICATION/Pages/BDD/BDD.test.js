import React from 'react';
import TestRenderer from 'react-test-renderer';

import BDD from './BDD';
import ConfigProvider from "../../Config/ConfigProvider";


test("BDD should render without throwing error and match Snapshot", async () => {
    const element = new TestRenderer.create(
        <ConfigProvider> <BDD /> </ConfigProvider>
    );

    expect(element).toMatchSnapshot();
});