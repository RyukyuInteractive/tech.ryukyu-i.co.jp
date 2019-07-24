---
layout: post
title:  'Laravelアプリケーションのテスト(PHPUnit)のtips'
date:   2019-07-24 18:30:00 +0900
comments: true
author: atomita
typora-root-url: ..
---

# Laravelアプリケーションのテスト(PHPUnit)のTips

## テストの前処理
PHPUnitでは`PHPUnit\Framework\TestCase::setUp`をoverrideし、そこでテストの前処理を行うのが一般的ですが、[`Illuminate\Foundation\Testing\TestCase`](https://github.com/laravel/framework/blob/5.8/src/Illuminate/Foundation/Testing/TestCase.php)がoverrideしているので、overrideした場合、`parent::setUp()`を呼び出す必要があります  
(documentにも明記されています)

ちょっとしたことですが、抜けるとtestが動かなくてハマる、なんてことにもなりかねないので`Illuminate\Foundation\Testing\TestCase::afterApplicationCreated`を使って、`setUp`とは別にoverrideできるmethodを用意するのがお勧めです

base: https://github.com/laravel/laravel/blob/5.7/tests/TestCase.php

```php
<?php
namespace Tests;

use Illuminate\Foundation\Testing\TestCase as BaseTestCase;

abstract class TestCase extends BaseTestCase
{
    use CreatesApplication;

    public function __construct(?string $name = null, array $data = [], string $dataName = '')
    {
        parent::__construct($name, $data, $dataName);
        $this->afterApplicationCreated([$this, 'beforeTest']);
    }

    protected function beforeTest()
    {
        // override
    }
}
```

こうしておけば、`Tests\TestCase`を継承した各テストクラスでは`beforeTest`をoverrideすることでテストの前処理が行えます


## php.iniの変更
laravel固有ではないですが(^^;

`ini_set`で変更可能なものだけですが、phpunit.xmlでphp.iniの設定が可能です

base: https://github.com/laravel/laravel/blob/5.7/phpunit.xml

```diff
    <php>
        <server name="APP_ENV" value="testing"/>
        <server name="BCRYPT_ROUNDS" value="4"/>
        <server name="CACHE_DRIVER" value="array"/>
        <server name="MAIL_DRIVER" value="array"/>
        <server name="QUEUE_CONNECTION" value="sync"/>
        <server name="SESSION_DRIVER" value="array"/>
+        <ini name="assert.exception" value="1"/>
+        <ini name="assert.active" value="1"/>
    </php>
</phpunit>
```

Note: ↑は`assert`関数を有効化していますが、`zend.assertions`はiniファイルで設定する必要があります


## descriptionにtest codeを表示する
こちらも、laravel固有ではないですが(^^;

素のままでも`assertEquals`などは値のdiffを表示してくれたりして十分便利なのですが、test codeのpathと行数だけじゃなく、test codeを表示してほしいと思いませんか？
私は思いました  
(power-assertみたいに！なんて欲は言いません)  
(「明示的にdescriptionを書け」なんてご無体なことは言わないでください、お願いします...)

[PHPでテスティングフレームワークを実装する前に知っておきたい勘所 #phperkaigi by 黒點 さん - niconare](https://niconare.nicovideo.jp/watch/kn2945)の真似になりますが、pathと行数がわかるんだからなんとかならないかなと思ってやってみた結果、`runTest`をoverrideしてtry/catchしてゴニョっとするのが良さそうです

base: https://github.com/laravel/laravel/blob/5.7/tests/TestCase.php

```php
<?php
namespace Tests;

use Illuminate\Foundation\Testing\TestCase as BaseTestCase;

abstract class TestCase extends BaseTestCase
{
    use CreatesApplication;

    protected function runTest()
    {
        try {
            parent::runTest();
        } catch (\Throwable $e) {
            $code = $this->getTestCodeFromTrace($e->getTrace());
            if ($code) {
                $refrection = new \ReflectionClass(get_class($e));
                $prop       = $refrection->getProperty('message');
                $prop->setAccessible(true);
                $value = $prop->getValue($e);
                $prop->setValue($e, $value . PHP_EOL . PHP_EOL . $code . PHP_EOL);
            }
            throw $e;
        }
    }

    private function getTestCodeFromTrace($trace)
    {
        foreach ($trace as $data) {
            $file = $data['file'];
            if (false === strpos($file, 'phpunit') && $file !== __FILE__) {
                $testcase = $data;
                break;
            }
        }
        if (isset($testcase)) {
            return $this->getTestCode($testcase['file'], $testcase['line']);
        }
    }

    private function getTestCode($path, $line)
    {
        $file = file($path);
        $row  = $file[$line - 1];
        $code = [$row];
        for ($i = 0; $i < 10; $i++) {
            if (false === strpos($row, ';')) {
                $row    = $file[$line + $i];
                $code[] = $row;
            }
        }
        $row = $code[0];
        for ($i = 2; $i < 12; $i++) {
            if (false === strpos($row, 'assert')) {
                $row = $file[$line - $i];
                array_unshift($code, $row);
            }
        }
        return implode('', $code);
    }
}
```


----


もし必要なら参考にしてみてください
