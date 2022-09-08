<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('banks_interest', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->integer('bank_id');
            $table->integer('account_type_id');
            $table->integer('period');
            $table->decimal('loan_percent', 5, 2,true);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('banks_interest');
    }
};
